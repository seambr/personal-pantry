"use client"
import FridgeResults from "@/components/FridgeResults"
import React from "react"

function page() {
  return (
    <main className="flex-grow flex justify-center items-center flex-col">
      <h2 className="text-xl border-b p-2 w-44 text-center">Your Fridge</h2>
      <FridgeResults />
    </main>
  )
}

export default page
