import { MealIngredient } from "@/interfaces/FoodInterfaces";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const meal_id = req.nextUrl.searchParams.get("id");

  const supabase = createClient();
  let { data: meal, error } = await supabase
    .from("Meals")
    .select("*")
    .eq("id", meal_id);

  if (!error) {
    return new NextResponse(JSON.stringify(meal), {
      status: 200,
    });
  } else {
    return new NextResponse(JSON.stringify({ error: "Failed To Find Meal" }), {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  // TODO: ADD one item to the menu
  // Given Ingredients and Quantities

  const body = await req.json();
  const meal = body.data;
  console.log(meal);
  const supabase = createClient();
  let { data: meals, error } = await supabase
    .from("Meals")
    .insert(meal)
    .select();

  if (!error) {
    return new NextResponse(JSON.stringify({ success: "Added Meal" }), {
      status: 200,
    });
  } else {
    return new NextResponse(JSON.stringify({ error: "Failed To Add Meal" }), {
      status: 500,
    });
  }
}
