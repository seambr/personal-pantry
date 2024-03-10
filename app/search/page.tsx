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

function Search() {
  const inputRef = useRef(null)
  const [input, setInput] = useState<string>("")
  const [alert, setAlert] = useState({ show: false, message: "" })
  const timeoutRef = useRef(null)
  const [results, setResults] = useState<SearchResponse>()
  const alertTime = 2000

  function showAlert(_alert) {
    if (alert.show) {
      // If component is already shown, clear the timeout and hide it
      clearTimeout(timeoutRef.current)
      setAlert({ show: false, message: "" })

      // Set a new timeout to show the component again
      const newTimeoutId = setTimeout(() => {
        setAlert(_alert)
      }, 150)

      timeoutRef.current = newTimeoutId
    } else {
      // Show component and set timeout to hide it after 2 seconds
      console.log("CALLING HERE")
      setAlert(_alert)
      const newTimeoutId = setTimeout(() => {
        setAlert({ show: false, message: "" })
      }, alertTime)
      timeoutRef.current = newTimeoutId
    }
  }

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
      <SearchResults results={results} showAlert={showAlert} />
      <AnimatePresence>
        {alert.show && (
          <motion.div
            className="alert-wrapper fixed top-0 w-full z-50 bg-destructive text-center h-8 flex items-center justify-center"
            initial={{ opacity: 0, y: -64 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -64 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {alert.message}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default Search
