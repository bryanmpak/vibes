import { NextAuthOptions } from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import GoogleProvider from "next-auth/providers/google"
import { JWT } from "next-auth/jwt"

const SPOTIFY_REFRESH_TOKEN_URL = "https://accounts.spotify.com/api/token"
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_SECRET
const expires = 60 * 60 // spotify default is 1 hr, in secs

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
      "base64"
    )
    const response = await fetch(SPOTIFY_REFRESH_TOKEN_URL, {
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=refresh_token&refresh_token=${token.refreshToken}`,
      cache: "no-cache",
      // body: new URLSearchParams({
      //   grant_type: "refresh_token",
      //   refresh_token: token.refreshToken!,
      // }),
    })

    const data = await response.json()
    console.log("refreshaccesstoken:", data)

    return {
      ...token,
      accessToken: data.access_token,
      accessTokenExpires: Date.now() + expires * 1000,
    }
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_SECRET!,
      authorization: {
        // url: "https://accounts.spotify.com/authorize?scope=user-read-email,playlist-modify-private,playlist-modify-public",
        params: {
          scope: "user-read-email, playlist-modify-public",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: Date.now() + expires * 1000,
          user,
        }
      }
      if (
        token.accessTokenExpires &&
        Date.now() - 600000 < token.accessTokenExpires
      ) {
        return token
      }
      const newToken = await refreshAccessToken(token)
      return newToken
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.error = token.error
      session.user = token.user
      return session
    },
  },
}
