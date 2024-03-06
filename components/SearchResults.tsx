"use client"
import React, { useEffect, useState } from "react"
import SearchCard from "./SearchCard"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SearchResponse } from "@/interfaces/FoodInterfaces"

function SearchResults() {
  const [results, setResults] = useState<SearchResponse>()

  useEffect(() => {
    fetch("api_return_test_data/search_res.json")
      .then((r) => r.json())
      .then((data) => setResults(data))
  }, [])
  console.log(results)
  return (
    <ScrollArea className="h-[650px] w-4/6 rounded-md border p-4 gap-2 m-auto mt-5">
      {results?.foods.map((r, idx) => (
        <SearchCard key={idx} foodItem={r} />
      ))}
    </ScrollArea>
  )
}

export default SearchResults
