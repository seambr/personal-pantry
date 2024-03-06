import React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import SearchResults from "@/components/SearchResults"

function page() {
  return (
    <div>
      <form action="" className="w-4/12 m-auto mt-20">
        <Label htmlFor="food-item">Food Item</Label>
        <div className="flex  gap-2">
          <Input type="text" placeholder="Enter Food Item..." id="food-item" />
          <Button>Search</Button>
        </div>
      </form>
      <SearchResults />
    </div>
  )
}

export default page
