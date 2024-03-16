import MealCard from "@/components/MealCard"
import { createClient } from "@/utils/supabase/server"
import { ChevronLeftIcon } from "@radix-ui/react-icons"
import React from "react"

async function MenuPage() {
  const supabase = createClient()

  let { data: Meals, error } = await supabase.from("Meals").select("*")

  return (
    <main className="flex-grow flex justify-center items-center flex-col xl:justify-start">
      {JSON.stringify(Meals)}
    </main>
  )
}

export default MenuPage
