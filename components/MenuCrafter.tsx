"use client"
import { FoodItemSQL, MealIngredient } from "@/interfaces/FoodInterfaces"
import React, { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { UnitInput } from "./NutritionTableEditWrapper"
import { Button } from "./ui/button"

function MenuCrafter({ foodItems }: { foodItems: FoodItemSQL[] }) {
  const [ingredients, setIngredients] = useState<MealIngredient[]>([])
  const [currentIngredientState, setCurrentIngredientState] = useState<
    MealIngredient | any
  >({
    foodItemId: null,
    amount: null,
    unit: "%",
    name: null,
    label: null,
    foodItem: null,
  })

  function handleFoodItemChange(foodItemId: BigInt) {
    const matchingfoodItem = foodItems.filter(
      (_foodItem) => _foodItem.id === foodItemId
    )[0]

    setCurrentIngredientState((_old) => ({
      ..._old!,
      foodItemId: foodItemId,
      foodItem: matchingfoodItem,
      label: `${
        matchingfoodItem.brandName
          ? matchingfoodItem.brandName
          : matchingfoodItem.brandOwner
      } ${matchingfoodItem.description}`,
    }))
  }
  function handleUnitChange(unit: string) {
    setCurrentIngredientState((_old) => ({ ..._old!, unit: unit }))
  }
  function handleAmountChange(e: React.FormEvent<HTMLInputElement>) {
    const amount: number = parseFloat(e.currentTarget.value)
    setCurrentIngredientState((_old) => ({
      ..._old!,
      amount: amount,
    }))
  }
  function handleAddItem() {
    // Check if all fields are filled

    const possibleIngredient = { ...currentIngredientState }
    if (
      possibleIngredient.unit !== "%" &&
      possibleIngredient.unit === possibleIngredient.foodItem.servingSizeUnit
    ) {
      let percent =
        100 *
        (possibleIngredient.amount / possibleIngredient.foodItem.servingSize)

      percent = parseFloat(percent.toFixed(2))
      possibleIngredient.amount = percent
      possibleIngredient.unit = "%"
    }

    setIngredients((_old) => [..._old, possibleIngredient])
  }

  return (
    <div className="w-full flex flex-col items-center h-full">
      <div className="item-unit-selector flex items-center justify-center w-full gap-2 p-5">
        <Select onValueChange={handleFoodItemChange}>
          <SelectTrigger className="w-48 min-w-48 max-w-48 ">
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
        <UnitInput
          unit={currentIngredientState?.foodItem?.servingSizeUnit || null}
          unitSelect
          onValueChange={handleUnitChange}
          onChange={handleAmountChange}
        />
      </div>
      <Button onClick={handleAddItem}>Add Ingredient</Button>
      {/* FIXME: Make this a scroll area */}
      <div className="added-items text-xs mt-5">
        {ingredients.map((_ingredient, idx) => (
          <p key={idx}>
            {_ingredient.amount}
            {_ingredient.unit} of {_ingredient.label}
          </p>
        ))}
      </div>
    </div>
  )
}

export default MenuCrafter
