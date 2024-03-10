import FridgeResults from "@/components/FridgeResults"
import { createClient } from "@/utils/supabase/server"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { AuthProvider } from "@/context/AuthProvider"
import { redirect } from "next/dist/server/api-utils"
async function Fridge() {
  // TODO: GET FRIDGE RESULTS DIRECTLY HERE
  const supabase = createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  return (
    <main className="flex-grow flex justify-center items-center flex-col">
      <h2 className="text-xl border-b p-2 w-44 text-center">Fridge</h2>
      {!error && <FridgeResults user={user} />}
    </main>
  )
}

export default Fridge
