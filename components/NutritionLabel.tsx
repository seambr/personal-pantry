import { FoodItemSQL } from "@/interfaces/FoodInterfaces"
import React from "react"

function NutritionLabel({ foodItem }: { foodItem: FoodItemSQL }) {
  return (
    <div className="max-w-xs p-4 border rounded-lg border-gray-200">
      <h2 className="text-lg font-bold mb-2">Nutrition Facts</h2>
      <p className="border-b border-gray-200 pb-2">{foodItem.description}</p>
      <div className="text-sm">
        <div className="flex justify-between my-2">
          <span>Calories</span>
          <span>{foodItem.Calories} kcal</span>
        </div>
        <div className="flex justify-between my-2">
          <span>Fat</span>
          <span>{foodItem["Total Fat"]} g</span>
        </div>
        <div className="flex justify-between my-2">
          <span>Carbohydrates</span>
          <span>{foodItem.Carbohydrate} g</span>
        </div>
        <div className="flex justify-between my-2">
          <span>Protein</span>
          <span>{foodItem.Protein} g</span>
        </div>
      </div>
    </div>
  )
}

export default NutritionLabel
