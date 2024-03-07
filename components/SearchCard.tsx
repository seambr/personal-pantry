import React from "react"
import { FoodItem } from "@/interfaces/FoodInterfaces"
import { Button } from "./ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function SearchCard({ foodItem }: { foodItem: FoodItem }) {
  return (
    <div className="flex w-full border border-secondary shadow-md rounded-md  mt-5 mb-5 p-5 justify-between items-center">
      <div>
        <h3 className="text-2xl text-primary font-bold ">
          {foodItem?.brandName}
        </h3>
        <p>{foodItem.description}</p>
        <p className="text-xs text-primary">{foodItem.foodCategory}</p>
        <p className="text-xs text-primary">ID : {foodItem.fdcId}</p>
      </div>
      <div className="flex gap-2">
        <Button>Add To Fridge</Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary">Edit</Button>
          </PopoverTrigger>
          <PopoverContent></PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default SearchCard
