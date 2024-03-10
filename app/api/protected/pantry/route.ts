import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
export async function GET() {
  // TODO: GET users entire pantry
  try {
    const supabase = createClient()

    let { data: FoodItems, error } = await supabase
      .from("FoodItems")
      .select("*")

    return NextResponse.json(FoodItems)
  } catch (error) {
    return NextResponse.json(error)
  }
}
