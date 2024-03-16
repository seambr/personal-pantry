import FridgeResults from "@/components/FridgeResults"
import { createClient } from "@/utils/supabase/server"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { AuthProvider } from "@/context/AuthProvider"
import { redirect } from "next/dist/server/api-utils"
async function Fridge() {
  // TODO: GET FRIDGE RESULTS DIRECTLY HERE AND PASS DOWN
  const supabase = createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  return (
    <main className="flex-grow flex justify-center items-center flex-col xl:justify-start">
      <h2 className="text-xl border-b p-2 w-44 text-center">Fridge</h2>
      {user ? (
        <FridgeResults user={user} />
      ) : (
        <h3 className="opacity-50">
          You must be logged in to view your fridge.
        </h3>
      )}
    </main>
  )
}

export default Fridge
