"use client"
import FridgeResults from "@/components/FridgeResults"
import React from "react"

function page() {
  return (
    <main className="flex-grow flex justify-center items-center flex-col">
      <h2>Your Fridge</h2>
      <FridgeResults />
    </main>
  )
}

export default page
