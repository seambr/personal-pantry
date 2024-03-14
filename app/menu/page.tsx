import React from "react"

function MenuPage() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("MealIngredients")
    .return(
      <main className="flex-grow flex justify-center items-center flex-col xl:justify-start">
        Menu Page
      </main>
    )
}

export default MenuPage
