"use client"
import React, { MouseEventHandler, useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import SearchResults from "@/components/SearchResults"
import { SearchResponse, SearchCriteria } from "@/interfaces/FoodInterfaces"
import axios, { isCancel, AxiosError } from "axios"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BookmarkFilledIcon } from "@radix-ui/react-icons"
import { motion, AnimatePresence } from "framer-motion"
import { AlertProvider, TopAlert } from "@/components/TopAlert"
function Search() {
  const inputRef = useRef(null)
  const [input, setInput] = useState<string>("")
  const [results, setResults] = useState<SearchResponse>()

  const handleInputChange = () => {
    setInput(inputRef.current!.value)
  }

  const handleSearch = (e: MouseEvent) => {
    e.preventDefault()

    const query: SearchCriteria = {
      query: input,
      dataType: ["Branded"],
      pageNumber: 1,
      pageSize: 25,
    }
    // Fetch search results
    try {
      axios
        .post("http://localhost:3000/api/search", {
          query: query,
        })
        .then((r) => setResults(r.data))
    } catch {
      // TODO: Make this an alert of some kind
      console.log("Failed to Fetch Data")
    }
  }

  return (
    <main className="w-full flex flex-col items-center">
      <form action="" className="w-10/12 m-auto mt-20 sm:w-8/12 md:w-6/12">
        <Label htmlFor="food-item">Food Item</Label>
        <div className="flex gap-2 w-full">
          <Input
            type="text"
            placeholder="Enter Food Item..."
            id="food-item"
            ref={inputRef}
            onChange={handleInputChange}
            className="w-full"
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
      </form>
      <AlertProvider>
        <SearchResults results={results} />
        <TopAlert />
      </AlertProvider>
    </main>
  )
}

export default Search
