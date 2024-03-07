import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import NavMenu from "@/components/NavMenu"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Personal Pantry",
  description: "Plan you meals with all the nutritional info you need",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-primary-foreground`}>
        <NavMenu />
        {children}
      </body>
    </html>
  )
}
