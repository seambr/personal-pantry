import { NextRequest, NextResponse } from "next/server"
// import pool from "../../../db"
import { createClient } from "@/utils/supabase/server"
import { FoodItemSQL } from "@/interfaces/FoodInterfaces"
import { calcLength } from "framer-motion"

export async function POST(req: NextRequest) {
  // TODO: ADD one item to pantry

  try {
    const supabase = createClient()

    const body = await req.json()

    const { data, error } = await supabase
      .from("FoodItems")
      .insert([body?.data])
      .select()
    if (error) {
      throw new Error("Failed to add")
    }
    return new NextResponse(JSON.stringify({ success: "Added Item" }), {
      status: 200,
    })
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Failed to add Item" }), {
      status: 500,
    })
  }
}

export async function GET(req: NextRequest) {
  // TODO: GET users entire pantry, BUT NOT ALL THE NUTRIENT DETAILS
  try {
    const url = req.nextUrl
    const searchParams = url.searchParams
    const itemId = searchParams.get("id")

    const supabase = createClient()

    let { data: FoodItems, error } = await supabase
      .from("FoodItems")
      .select("*")
      .eq("id", itemId)

    return NextResponse.json(FoodItems)
  } catch (error) {
    return NextResponse.json(error)
  }
}

export async function PUT(req: NextRequest) {
  // TODO: ADD one item to pantry

  try {
    const supabase = createClient()

    const body = await req.json()

    const foodItem: FoodItemSQL = body.data.foodItem

    const { data, error } = await supabase
      .from("FoodItems")
      .update(foodItem)
      .eq("id", foodItem.id)

    console.log(error)
    if (error) {
      throw new Error("Failed to add")
    }

    return new NextResponse(JSON.stringify({ success: "Added Item" }), {
      status: 200,
    })
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Failed to add Item" }), {
      status: 500,
    })
  }
}

export async function DELETE(req: NextRequest) {
  // TODO: ADD one item to pantry

  try {
  } catch (error) {}
}
