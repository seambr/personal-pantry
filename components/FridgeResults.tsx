"use client"
import React, { useEffect, useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FoodItem, SearchResponse } from "@/interfaces/FoodInterfaces"

function FridgeResults({}) {
  const [results, setResults] = useState<SearchResponse>()

  useEffect(() => {
    fetch("api_return_test_data/search_res.json")
      .then((r) => r.json())
      .then((data) => setResults(data))
  }, [])

  return (
    <ScrollArea className="h-[calc(100vh-15em)] w-6/6 rounded-md p-4 gap-2">
      <div className="fridge-grid flex flex-col sm:grid sm:grid-cols-2 gap-1 gap-y-5 gap-x-5">
        {results?.foods.map((r: FoodItem, idx) => (
          <div
            key={idx}
            className="fridge-item border border-secondary shadow-md rounded-md p-5 justify-between items-center h-28 sm:h-32"
          >
            <h3 className="font-bold">
              {r.brandName || r.brandOwner || "N/A"}
            </h3>
            <p className="text-xs sm:text-sm">{r.description}</p>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

export default FridgeResults
