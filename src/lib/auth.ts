import { NextAuthOptions } from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_SECRET!,
    }),
    // GoogleProvider({
    //   clientId:,
    //   clientSecret:
    // })
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.id = account.id
        token.accessToken = account.refresh_token
      }
      return token
    },
    async session({ session, user }) {
      session.user = user
      return session
    },
  },
}
