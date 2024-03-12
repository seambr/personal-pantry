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
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()

  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-primary-foreground flex flex-col`}
      >
        <NavMenu user={data?.user} />
        {children}
      </body>
    </html>
  )
}
