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
      <>
        <div className="name-input-wrapper flex-col flex gap-2 mb-5">
          <Label htmlFor="owner-name">Owner Name</Label>
          <Input type="text" id="owner-name" />

          <Label htmlFor="brand-name">Brand Name</Label>
          <Input type="text" id="brand-name" />
        </div>

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
            <Label htmlFor="calories">Calories</Label>
            <UnitInput type="text" id="calories" unit="kcal" />

            <Label htmlFor="total-fat">Total Fat</Label>
            <UnitInput id="total-fat" type="text" unit="g" />

            <Label htmlFor="saturated-dat">Saturated Fat</Label>
            <UnitInput id="saturated-dat" type="text" unit="g" />

            <Label htmlFor="trans-fat">Trans Fat</Label>
            <UnitInput id="trans-fat" type="text" unit="g" />

            <Label htmlFor="cholesterol">Cholesterol</Label>
            <UnitInput id="cholesterol" type="text" unit="mg" />

            <Label htmlFor="sodium">Sodium</Label>
            <UnitInput id="sodium" type="text" unit="mg" />

            <Label htmlFor="total-carbohydrates">Total Carbohydrate</Label>
            <UnitInput id="total-carbohydrates" type="text" unit="g" />

            <Label htmlFor="dietary-fiber">Dietary Fiber</Label>
            <UnitInput id="dietary-fiber" type="text" unit="g" />

            <Label htmlFor="sugars">Sugars</Label>
            <UnitInput id="sugars" type="text" unit="g" />

            <Label htmlFor="added-sugars">Added Sugars</Label>
            <UnitInput id="added-sugars" type="text" unit="g" />

            <Label htmlFor="protein">Protein</Label>
            <UnitInput id="protein" type="text" unit="g" />

            <Label htmlFor="serving-size">Serving Size</Label>
            <UnitInput id="serving-size" type="text" unit="g" />
          </div>

          <p className="text-xs mt-2 opacity-50">
            Disclaimer: Items retrieved via the FDC API search may contain
            incomplete, or sometimes incorrect, data. If something looks off it
            may be, be sure to double check and make any corrections.
          </p>
        </div>
      </>
    )
  }

  return (
    foodItem && (
      <>
        <h1 className="textx-xl border-b mb-5">
          {foodItem.brandName || foodItem.brandOwner} {foodItem.description}
        </h1>
        <NutritionTable
          foodItem={foodItem}
          setisEdit={setisEdit}
        ></NutritionTable>
      </>
    )
  )
}

function UnitInput({ unit, id }: { unit: string; id: string }) {
  return (
    <div className="unit-wrapper relative rounded-md overflow-hidden">
      <Input id={id} type="text" placeholder="value" />
      <div className="absolute right-0 w-12 h-full bg-secondary top-0 flex justify-center items-center border-l text-sm">
        {unit}
      </div>
    </div>
  )
}

export default NutritionTableEditWrapper
