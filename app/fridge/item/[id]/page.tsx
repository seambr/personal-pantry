import FoodTable from "@/components/FoodTable"
import NutritionLabel from "@/components/NutritionLabel"
import { createClient } from "@/utils/supabase/server"
import React from "react"

async function ItemPage(props) {
  const id = props.params.id

  const supabase = createClient()

  const { data: FoodItems, error } = await supabase
    .from("FoodItems")
    .select("*")
    .eq("id", id)

  return <FoodTable foodItem={FoodItems[0]} isSQL />
}

export default ItemPage
