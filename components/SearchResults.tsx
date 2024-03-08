"use client"
import React, { useEffect, useState } from "react"
import SearchCard from "./SearchCard"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FoodItem, SearchResponse } from "@/interfaces/FoodInterfaces"

function SearchResults({ results }: { results: SearchResponse }) {
  return results?.foods.length > 0 ? (
    <ScrollArea className="h-[650px] w-5/6 rounded-md p-4 gap-2 m-auto mt-5 flex justify-center">
      {results?.foods.map((r, idx) => (
        <SearchCard key={idx} foodItem={r} />
      ))}
    </ScrollArea>
  ) : (
    <div className="w-full text-center mt-20">Search for an item to begin.</div>
  )
}

export default SearchResults
