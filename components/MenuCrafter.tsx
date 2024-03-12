"use client"
import { FoodItemSQL } from "@/interfaces/FoodInterfaces"
import React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { UnitInput } from "./NutritionTableEditWrapper"
function MenuCrafter({ foodItems }: { foodItems: FoodItemSQL[] }) {
  console.log(foodItems)
  return (
    <div className="w-full flex flex-col items-center">
      <div className="added-item text-xs">
        {foodItems[0].brandOwner} {foodItems[0].brandName}{" "}
        {foodItems[0].description}
      </div>
      <div className="item-unit-selector flex items-center justify-center w-full gap-2 p-5">
        <Select>
          <SelectTrigger className="w-60 min-w-60 max-w-60">
            <SelectValue placeholder="Select food item to add." />
          </SelectTrigger>
          <SelectContent>
            {foodItems.map((foodItem, idx) => (
              <SelectItem value={foodItem.id} key={idx}>
                {foodItem.brandName || foodItem.brandOwner}{" "}
                {foodItem.description}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <UnitInput unit="g" unitSelect />
      </div>
    </div>
  )
}

export default MenuCrafter
