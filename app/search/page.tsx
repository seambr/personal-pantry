"use client"
import React, { MouseEventHandler, useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import SearchResults from "@/components/SearchResults"
import { SearchResponse, SearchCriteria } from "@/interfaces/FoodInterfaces"

function Search() {
  const inputRef = useRef(null)
  const [input, setInput] = useState<string>("")

  const [results, setResults] = useState<SearchResponse>()

  const handleInputChange = () => {
    setInput(inputRef.current.value)
  }
  const handleSearch = (e: MouseEvent) => {
    e.preventDefault()

    const query: SearchCriteria = {
      query: input,
      dataType: ["Branded"],
      pageNumber: 1,
      pageSize: 25,
    }

    fetch("http://localhost:3000/api/search", {
      method: "POST",
      body: JSON.stringify({
        query: query,
      }),
    })
      .then((r) => r.json())
      .then((data) => setResults(data))
  }

  return (
    <main className="">
      <form action="" className="w-4/12 m-auto mt-20">
        <Label htmlFor="food-item">Food Item</Label>
        <div className="flex  gap-2">
          <Input
            type="text"
            placeholder="Enter Food Item..."
            id="food-item"
            ref={inputRef}
            onChange={handleInputChange}
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
      </form>
      <SearchResults results={results} />
    </main>
  )
}

export default Search
