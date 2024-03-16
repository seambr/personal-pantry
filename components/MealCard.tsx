import { MealIngredient } from "@/interfaces/FoodInterfaces"
import React from "react"

function MealCard({ mealItem }: { mealItem: MealIngredient[] }) {
  return (
    <div className="meal-item hover:bg-secondary flex border-b border-secondary shadow-md  p-5 justify-between items-center h-28 sm:h-32">
      {mealItem.map((meal) => {
        return meal.amount
      })}
    </div>
  )
}

export default MealCard
