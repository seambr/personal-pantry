import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import NavMenu from "@/components/NavMenu"
const inter = Inter({ subsets: ["latin"] })
import { UserProvider } from "@auth0/nextjs-auth0/client"
import Head from "next/head"

export const metadata: Metadata = {
  title: "Macro Fridge",
  description: "Plan you meals with all the nutritional info you need",
  keywords: "macro health diet meal recipe meal meal-prep prep",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <UserProvider>
        <body
          className={`${inter.className} bg-primary-foreground flex flex-col`}
        >
          <NavMenu />
          {children}
        </body>
      </UserProvider>
    </html>
  )
}
