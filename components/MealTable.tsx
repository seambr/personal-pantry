import React from "react"
import NutritionTable from "./NutritionTable"
import { Meal, FoodItemSQL } from "@/interfaces/FoodInterfaces"

function MealTable({ mealItem }: { mealItem: Meal }) {
  // Convert Meal Item to FoodItem Interface so I can use the same table
  const psudo_food_item: FoodItemSQL = {
    Calories: mealItem.calories,
    "Total Fat": mealItem.total_fat,
    "Saturated Fat": mealItem.saturated_fat,
    "Trans Fat": mealItem.trans_fat,
    Cholesterol: mealItem.cholesterol,
    Sodium: mealItem.sodium,
    Carbohydrate: mealItem.total_carbohydrates,
    "Dietary Fiber": mealItem.dietary_fiber,
    "Total Sugars": mealItem.total_sugars,
    "Added Sugars": mealItem.added_sugars,
    Protein: mealItem.protein,
    servingSize: null,
    servingSizeUnit: null,
  }

  return <NutritionTable foodItem={psudo_food_item} />
}

export default MealTable
