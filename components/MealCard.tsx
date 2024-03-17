import { Meal, MealIngredient } from "@/interfaces/FoodInterfaces"
import { createClient } from "@/utils/supabase/server"
import React from "react"

async function MealCard({ meal }: { meal: Meal }) {
  // get list of all ingredient_ids
  const extractIngredientIds = (meal) => {
    let ingredientIds = []
    for (let i = 1; i <= 15; i++) {
      const ingredientId = meal[`ingredient${i}_id`]
      if (ingredientId !== null) {
        ingredientIds.push(ingredientId)
      }
    }
    return ingredientIds
  }
  const extractIngredientAmounts = (meal) => {
    let amounts = []
    for (let i = 1; i <= 15; i++) {
      const ingredientId = meal[`ingredient${i}_amount`]
      if (ingredientId !== null) {
        amounts.push(ingredientId)
      }
    }
    return amounts
  }
  // FIXME: make a ids --> amount map instead
  const ingredientIds = extractIngredientIds(meal)
  const ingredientAmounts = extractIngredientAmounts(meal)

  const supabase = createClient()

  let { data: FoodItems, error } = await supabase
    .from("FoodItems")
    .select("*")
    .in("id", ingredientIds)
  console.log(FoodItems)
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
