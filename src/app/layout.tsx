import "./globals.css"
import { Inter, Roboto } from "next/font/google"

import { getServerSession } from "next-auth"
import { authOptions } from "@/src/lib/auth"
import Navbar from "@/src/components/Navbar"
import { SessionProvider } from "../components/SessionProvider"
import Login from "../components/Login"

const inter = Inter({ subsets: ["latin"] })
const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
})

export const metadata = {
  title: "vibes",
  description: "gpt jams",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={`bg-bg_main ${roboto.className}`}>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <main className="flex  mx-auto h-screen flex-col max-w-[800px] justify-between">
              <Navbar />
              {children}
            </main>
          )}
        </SessionProvider>
      </body>
    </html>
  )
}
