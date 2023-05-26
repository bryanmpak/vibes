import "./globals.css"
import { Inter, Roboto } from "next/font/google"
import { SessionProvider } from "../../components/SessionProvider"
import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"

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
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  )
}
