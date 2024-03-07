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
    <ScrollArea className="h-[650px] w-4/6 rounded-md border p-4 gap-2 m-auto mt-5">
      <div className="fridge-grid grid grid-cols-3 gap-5">
        {results?.foods.map((r: FoodItem, idx) => (
          <div
            key={idx}
            className="fridge-item border border-secondary shadow-md rounded-md  mt-5 mb-5 p-5 justify-between items-center"
          >
            <h3 className="font-bold">{r.brandName}</h3>
            <p className="text-sm">{r.description}</p>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

export default FridgeResults
