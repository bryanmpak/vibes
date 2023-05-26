import "./globals.css"
import { Inter, Roboto } from "next/font/google"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Navbar from "@/src/components/Navbar"
import TextInput from "@/src/components/TextInput"

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
      <body className={roboto.className}>
        {/* <SessionProvider session={session}> */}
        <main className="flex h-screen flex-col justify-between bg-bg_main">
          <Navbar />

          {children}
          <TextInput />
        </main>
        {/* </SessionProvider> */}
      </body>
    </html>
  )
}
