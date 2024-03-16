import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
export async function GET() {
  // TODO: GET users entire pantry, BUT NOT ALL THE NUTRIENT DETAILS
  try {
    const supabase = createClient()

    let { data: FoodItems, error } = await supabase
      .from("FoodItems")
      .select(
        "id,edited,description,ingredients,createdAt,dataType,brandOwner,brandName,foodCategory,servingSize,servingSizeUnit,householdServingFullText,Calories"
      )

    return NextResponse.json(FoodItems)
  } catch (error) {
    return NextResponse.json(error)
  }
}
