import FridgeResults from "@/components/FridgeResults"
import { createClient } from "@/utils/supabase/server"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { AuthProvider } from "@/context/AuthProvider"
import { redirect } from "next/dist/server/api-utils"

async function CookPage() {
  return (
    <main className="flex-grow flex justify-center items-center flex-col xl:justify-start">
      Cook Page
    </main>
  )
}

export default CookPage
