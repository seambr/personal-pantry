"use client"
import NutritionTable from "@/components/NutritionTable"
import { FoodItemSQL } from "@/interfaces/FoodInterfaces"
import { Pencil2Icon } from "@radix-ui/react-icons"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import React, { useRef, useState, forwardRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { cn } from "@/lib/utils"
function NutritionTableEditWrapper({
  foodItem,
  setFoodItem,
}: {
  foodItem: FoodItemSQL | null
  setFoodItem: React.Dispatch<React.SetStateAction<FoodItemSQL | null>>
}) {
  // TODO: Track householdServingSizeFullText also
  const [isEdit, setisEdit] = useState<boolean>()
  const servingSizeUnitRef = useRef(null)
  const caloriesRef = useRef(null)
  const totalFatRef = useRef(null)
  const saturatedFatRef = useRef(null)
  const transFatRef = useRef(null)
  const cholesterolRef = useRef(null)
  const sodiumRef = useRef(null)
  const totalCarbohydratesRef = useRef(null)
  const dietaryFiberRef = useRef(null)
  const sugarsRef = useRef(null)
  const addedSugarsRef = useRef(null)
  const proteinRef = useRef(null)
  const servingSizeRef = useRef(null)
  const brandOwnerRef = useRef(null)
  const brandNameRef = useRef(null)

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
      servingSizeUnit: servingSizeUnitRef.current.value,
    }

    setFoodItem(newFood)

    async function updateDatabase() {
      try {
        // Update Database
        const res = await axios.put("/api/protected/pantry/item", {
          data: { foodItem: newFood },
        })
      } catch (error) {
        // Failed To Update
        // TODO: Trigger Failed Notification
      }
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
              unit={foodItem?.servingSizeUnit}
              ref={servingSizeRef}
              defaultValue={foodItem?.servingSize}
            />
            <Label htmlFor="serving-size">Serving Size Unit</Label>
            <Input
              id="serving-size-unit"
              type="text"
              unit="g"
              ref={servingSizeUnitRef}
              defaultValue={foodItem?.servingSizeUnit}
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
        <h1 className="textx-xl border-b mb-5 text-center pb-2">
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

const UnitInput = forwardRef(
  (
    {
      unit,
      id,
      defaultValue = "",
      unitSelect,
      className = "",
      onValueChange = () => null,
      onChange = () => null,
    },
    ref
  ) => {
    return (
      <div className="unit-wrapper relative rounded-md overflow-hidden w-36 flex">
        <Input
          id={id}
          type="number"
          placeholder="value"
          datatype="number"
          min={0}
          max={999}
          defaultValue={defaultValue}
          ref={ref}
          onChange={onChange}
        />

        {!unitSelect ? (
          <div className="absolute right-0 w-12 h-full bg-secondary top-0 flex justify-center items-center border-l text-sm">
            {unit}
          </div>
        ) : (
          <Select onValueChange={onValueChange} defaultValue="%">
            <SelectTrigger
              className={cn(
                "w-16 absolute top-0 right-0 rounded-none bg-primary-foreground flex",
                className
              )}
            >
              <SelectValue placeholder="unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="%">%</SelectItem>
              {unit && <SelectItem value={unit}>{unit}</SelectItem>}
            </SelectContent>
          </Select>
        )}
      </div>
    )
  }
)
UnitInput.displayName = "UnitInput"
export default NutritionTableEditWrapper
export { UnitInput }
