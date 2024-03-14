import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  // TODO: GET all items from menu

  const supabase = createClient()
  const { data, error } = await supabase.from("MealIngredients").select("*")

  if (!error) {
    return new NextResponse(JSON.stringify({ success: "Retrieved Meals" }), {
      status: 200,
    })
  } else {
    return new NextResponse(
      JSON.stringify({ error: "Failed To retrieve Meals" }),
      {
        status: 500,
      }
    )
  }
}
