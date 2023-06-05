import { NextAuthOptions } from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_SECRET!,
      authorization: {
        url: "https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private",
      },
    }),
    // GoogleProvider({
    //   clientId:,
    //   clientSecret:
    // })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      return { ...token, ...account }
    },
    async session({ session, token }) {
      session.user = token as any
      return session
    },
  },
}
