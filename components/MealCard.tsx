import { Meal, MealIngredient } from "@/interfaces/FoodInterfaces"
import React from "react"

function MealCard({ meal }: { meal: Meal }) {
  return (
    <div className="w-96 meal-item hover:bg-secondary flex border-b border-secondary shadow-md  p-5 justify-between items-center h-28 sm:h-32">
      <div className="info-container">
        <h3 className="font-bold">{meal.name}</h3>
        <p className="text-xs sm:text-sm">{meal.description}</p>
      </div>

      <div className="shorthand-nutrition text-right">
        <p>200 g</p>
        <p>500 Calories</p>
        <p className="text-xs">{meal.id}</p>
      </div>
    </div>
  )
}

export default MealCard
