"use client"
import NutritionTable from "@/components/NutritionTable"
import { FoodItemSQL } from "@/interfaces/FoodInterfaces"
import { Pencil2Icon } from "@radix-ui/react-icons"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
function NutritionTableEditWrapper({
  foodItem,
  setFoodItem,
}: {
  foodItem: FoodItemSQL | null
  setFoodItem: React.Dispatch<React.SetStateAction<FoodItemSQL | null>>
}) {
  const [isEdit, setisEdit] = useState<boolean>()

  if (isEdit) {
    return (
      <div className="table-wrapper w-10/12 flex justify-center mx-auto flex-col text-slate-200 md:w-[500px]">
        <div className="table-header flex items-center justify-between  mb-2 ">
          <h3 className="font-bold text-2xl text-primary">
            Nutrition Information
          </h3>
          <Pencil2Icon
            className="h-full w-6"
            onClick={() => setisEdit(false)}
          />
        </div>
        <div className="input-container flex flex-col gap-1">
          <Label htmlFor="">Calories</Label>
          <Input type="text" id="calories" placeholder="Enter Value" />

          <Label htmlFor="total-fat">Total Fat</Label>
          <Input id="total-fat" type="text" placeholder="Enter Value" />

          <Label htmlFor="saturated-dat">Saturated Fat</Label>
          <Input id="saturated-dat" type="text" placeholder="Enter Value" />

          <Label htmlFor="trans-fat">Trans Fat</Label>
          <Input id="trans-fat" type="text" placeholder="Enter Value" />

          <Label htmlFor="cholesterol">Cholesterol</Label>
          <Input id="cholesterol" type="text" placeholder="Enter Value" />

          <Label htmlFor="sodium">Sodium</Label>
          <Input id="sodium" type="text" placeholder="Enter Value" />

          <Label htmlFor="total-carbohydrates">Total Carbohydrate</Label>
          <Input
            id="total-carbohydrates"
            type="text"
            placeholder="Enter Value"
          />

          <Label htmlFor="dietary-fiber">Dietary Fiber</Label>
          <Input id="dietary-fiber" type="text" placeholder="Enter Value" />

          <Label htmlFor="sugars">Sugars</Label>
          <Input id="sugars" type="text" placeholder="Enter Value" />

          <Label htmlFor="added-sugars">Added Sugars</Label>
          <Input id="added-sugars" type="text" placeholder="Enter Value" />

          <Label htmlFor="protein">Protein</Label>
          <Input id="protein" type="text" placeholder="Enter Value" />

          <Label htmlFor="serving-size">Serving Size</Label>
          <Input id="serving-size" type="text" placeholder="Enter Value" />
        </div>

        <p className="text-xs mt-2 opacity-50">
          Disclaimer: Items retrieved via the FDC API search may contain
          incomplete, or sometimes incorrect, data. If something looks off it
          may be, be sure to double check and make any corrections.
        </p>
      </div>
    )
  }

  return (
    foodItem && (
      <NutritionTable
        foodItem={foodItem}
        setisEdit={setisEdit}
      ></NutritionTable>
    )
  )
}

export default NutritionTableEditWrapper
