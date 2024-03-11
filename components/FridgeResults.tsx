"use client"
import React, { useEffect, useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FoodItem } from "@/interfaces/FoodInterfaces"
import { useAuth } from "@/context/AuthProvider"
import axios from "axios"
import FoodTable from "./FoodTable"
function FridgeResults({ user }) {
  // TODO: GET FRIDGE RESULTS FROM SERVER PARENT
  const [results, setResults] = useState<FoodItem[] | null>(null)

  useEffect(() => {
    console.log(user)
    async function getFridge() {
      const data = await axios.get("/api/protected/pantry")
      setResults(data?.data)
    }

    if (user) {
      getFridge()
    }
  }, [])

  return (
    <>
      <ScrollArea className="h-[calc(100vh-15em)] w-full rounded-md p-4 gap-2">
        <div className="fridge-grid flex flex-col sm:grid sm:grid-cols-2 gap-1 gap-y-5 gap-x-5 lg:grid-cols-3">
          {results?.map((r: FoodItem, idx) => (
            <FridgeCard key={idx} foodItem={r} />
          ))}
        </div>
      </ScrollArea>
    </>
  )
}

function FridgeCard({ foodItem }: { foodItem: FoodItem }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="fridge-item border border-secondary shadow-md rounded-md p-5 justify-between items-center h-28 sm:h-32">
      <h3 className="font-bold">
        {foodItem.brandName || foodItem.brandOwner || "N/A"}
      </h3>
      <p className="text-xs sm:text-sm">{foodItem.description}</p>
      <FoodTable foodItem={foodItem} />
    </div>
  )
}

export default FridgeResults
