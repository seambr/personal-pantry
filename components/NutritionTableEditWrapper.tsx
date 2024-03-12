"use client"
import NutritionTable from "@/components/NutritionTable"
import { FoodItemSQL } from "@/interfaces/FoodInterfaces"
import { Pencil2Icon } from "@radix-ui/react-icons"

import React, { useRef, useState, forwardRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
function NutritionTableEditWrapper({
  foodItem,
  setFoodItem,
}: {
  foodItem: FoodItemSQL | null
  setFoodItem: React.Dispatch<React.SetStateAction<FoodItemSQL | null>>
}) {
  const [isEdit, setisEdit] = useState<boolean>()
  const caloriesRef = useRef()
  const totalFatRef = useRef()
  const saturatedFatRef = useRef()
  const transFatRef = useRef()
  const cholesterolRef = useRef()
  const sodiumRef = useRef()
  const totalCarbohydratesRef = useRef()
  const dietaryFiberRef = useRef()
  const sugarsRef = useRef()
  const addedSugarsRef = useRef()
  const proteinRef = useRef()
  const servingSizeRef = useRef()
  const brandOwnerRef = useRef()
  const brandNameRef = useRef()

  function handleSave(e) {
    e.preventDefault()

    const newFood: FoodItemSQL = {
      ...foodItem,
      Calories: parseFloat(caloriesRef.current.value),
      "Total Fat": parseFloat(totalFatRef.current.value),
      "Saturated Fat": parseFloat(saturatedFatRef.current.value),
      "Trans Fat": parseFloat(transFatRef.current.value),
      Cholesterol: parseFloat(cholesterolRef.current.value),
      Sodium: parseFloat(sodiumRef.current.value),
      Carbohydrate: parseFloat(totalCarbohydratesRef.current.value),
      "Dietary Fiber": parseFloat(dietaryFiberRef.current.value),
      "Total Sugars": parseFloat(sugarsRef.current.value),
      "Added Sugars": parseFloat(addedSugarsRef.current.value),
      Protein: parseFloat(proteinRef.current.value),
      servingSize: parseFloat(servingSizeRef.current.value),
      brandOwner: brandOwnerRef.current.value,
      brandName: brandNameRef.current.value,
    }

    setFoodItem(newFood)

    async function updateDatabase() {
      const res = await axios.put("/api/protected/pantry/item", {
        data: { foodItem: newFood },
      })
      console.log(res)
    }

    updateDatabase()
  }

  if (isEdit) {
    return (
      <>
        <div className="name-input-wrapper flex-col flex gap-2 mb-5">
          <Label htmlFor="owner-name">Owner Name</Label>
          <Input
            type="text"
            id="owner-name"
            ref={brandOwnerRef}
            defaultValue={foodItem?.brandOwner}
          />

          <Label htmlFor="brand-name">Brand Name</Label>
          <Input
            type="text"
            id="brand-name"
            ref={brandNameRef}
            defaultValue={foodItem?.brandName}
          />
        </div>

        <div className="table-wrapper w-10/12 flex justify-center mx-auto flex-col text-slate-200 md:w-[500px]">
          <div className="table-header flex items-center justify-between  mb-2 ">
            <h3 className="font-bold text-2xl text-primary">
              Nutrition Information
            </h3>
            <Pencil2Icon
              className="h-full w-6"
              onClick={(e) => {
                handleSave(e)
                setisEdit(false)
              }}
            />
          </div>
          <div className="input-container flex flex-col gap-1">
            <Label htmlFor="calories">Calories</Label>
            <UnitInput
              type="text"
              id="calories"
              unit="kcal"
              ref={caloriesRef}
              defaultValue={foodItem?.Calories}
            />

            <Label htmlFor="total-fat">Total Fat</Label>
            <UnitInput
              id="total-fat"
              type="text"
              unit="g"
              ref={totalFatRef}
              defaultValue={foodItem?.["Total Fat"]}
            />

            <Label htmlFor="saturated-fat">Saturated Fat</Label>
            <UnitInput
              id="saturated-fat"
              type="text"
              unit="g"
              ref={saturatedFatRef}
              defaultValue={foodItem?.["Saturated Fat"]}
            />

            <Label htmlFor="trans-fat">Trans Fat</Label>
            <UnitInput
              id="trans-fat"
              type="text"
              unit="g"
              ref={transFatRef}
              defaultValue={foodItem?.["Trans Fat"]}
            />

            <Label htmlFor="cholesterol">Cholesterol</Label>
            <UnitInput
              id="cholesterol"
              type="text"
              unit="mg"
              ref={cholesterolRef}
              defaultValue={foodItem?.Cholesterol}
            />

            <Label htmlFor="sodium">Sodium</Label>
            <UnitInput
              id="sodium"
              type="text"
              unit="mg"
              ref={sodiumRef}
              defaultValue={foodItem?.Sodium}
            />

            <Label htmlFor="total-carbohydrates">Total Carbohydrate</Label>
            <UnitInput
              id="total-carbohydrates"
              type="text"
              unit="g"
              ref={totalCarbohydratesRef}
              defaultValue={foodItem?.Carbohydrate}
            />

            <Label htmlFor="dietary-fiber">Dietary Fiber</Label>
            <UnitInput
              id="dietary-fiber"
              type="text"
              unit="g"
              ref={dietaryFiberRef}
              defaultValue={foodItem?.["Dietary Fiber"]}
            />

            <Label htmlFor="sugars">Sugars</Label>
            <UnitInput
              id="sugars"
              type="text"
              unit="g"
              ref={sugarsRef}
              defaultValue={foodItem?.["Total Sugars"]}
            />

            <Label htmlFor="added-sugars">Added Sugars</Label>
            <UnitInput
              id="added-sugars"
              type="text"
              unit="g"
              ref={addedSugarsRef}
              defaultValue={foodItem?.["Added Sugars"]}
            />

            <Label htmlFor="protein">Protein</Label>
            <UnitInput
              id="protein"
              type="text"
              unit="g"
              ref={proteinRef}
              defaultValue={foodItem?.Protein}
            />

            <Label htmlFor="serving-size">Serving Size</Label>
            <UnitInput
              id="serving-size"
              type="text"
              unit="g"
              ref={servingSizeRef}
              defaultValue={foodItem?.servingSize}
            />
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

const UnitInput = forwardRef(({ unit, id, defaultValue = "" }, ref) => {
  return (
    <div className="unit-wrapper relative rounded-md overflow-hidden">
      <Input
        id={id}
        type="text"
        placeholder="value"
        defaultValue={defaultValue}
        ref={ref}
      />
      <div className="absolute right-0 w-12 h-full bg-secondary top-0 flex justify-center items-center border-l text-sm">
        {unit}
      </div>
    </div>
  )
})
UnitInput.displayName = "UnitInput"
export default NutritionTableEditWrapper
