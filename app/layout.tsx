import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import NavMenu from "@/components/NavMenu"
const inter = Inter({ subsets: ["latin"] })
import Head from "next/head"
import { AuthProvider } from "@/context/AuthProvider"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/dist/server/api-utils"
export const metadata: Metadata = {
  title: "Macro Fridge",
  description: "Plan you meals with all the nutritional info you need",
  keywords: "macro health diet meal recipe meal meal-prep prep",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Head>
        <meta
          key="vp-tag"
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta
          key="apple-tag"
          name="apple-mobile-web-app-capable"
          content="yes"
        ></meta>
        <meta
          key="min-ui-tag"
          name="viewport"
          content="width=device-width, initial-scale=1, minimal-ui"
        ></meta>
        <link rel="manifest" href="/manifest.json" key="manifest-tag"></link>
      </Head>

      <body
        className={`${inter.className} bg-primary-foreground flex flex-col`}
      >
        <NavMenu />
        {children}
      </body>
    </html>
  )
}
