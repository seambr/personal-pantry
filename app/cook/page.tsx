import { createClient } from "@/utils/supabase/server"

import React, { useEffect, useState } from "react"

import MenuCrafter from "@/components/MenuCrafter"

async function CookPage() {
  const supabase = createClient()

  let { data: foodItems, error } = await supabase
    .from("FoodItems")
    .select(
      "id,edited,description,ingredients,createdAt,brandOwner,brandName,foodCategory,servingSize,servingSizeUnit,householdServingFullText,Calories"
    )

  return (
    <main className="flex-grow flex justify-center items-center flex-col xl:justify-start">
      <MenuCrafter foodItems={foodItems}></MenuCrafter>
    </main>
  )
}

export default CookPage
