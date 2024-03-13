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
  >({ foodItemId: null, amount: null, unit: null, name: null, label: null })

  function handleFoodItemChange(foodItemId: BigInt) {
    const matchingfoodItem = foodItems.filter(
      (_foodItem) => _foodItem.id === foodItemId
    )[0]

    setCurrentIngredientState((_old) => ({
      ..._old!,
      foodItemId: foodItemId,
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
    setIngredients((_old) => [..._old, currentIngredientState])
    setCurrentIngredientState
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="added-items text-xs">
        {ingredients.map((_ingredient, idx) => (
          <p key={idx}>
            {_ingredient.amount} {_ingredient.unit} of {_ingredient.label}
          </p>
        ))}
      </div>

      <div className="item-unit-selector flex items-center justify-center w-full gap-2 p-5">
        <Select onValueChange={handleFoodItemChange}>
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
        <UnitInput
          unit="g"
          unitSelect
          onValueChange={handleUnitChange}
          onChange={handleAmountChange}
        />
      </div>
      <Button onClick={handleAddItem}>Add Ingredient</Button>
    </div>
  )
}

export default MenuCrafter
