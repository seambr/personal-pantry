import { NextRequest, NextResponse } from "next/server"
// import pool from "../../../db"
import { createClient } from "@/utils/supabase/server"

export async function POST(req: NextRequest) {
  // TODO: ADD one item to pantry

  try {
    const supabase = createClient()

    const body = await req.json()

    const { data, error } = await supabase
      .from("FoodItems")
      .insert([body?.data])
      .select()
    return new NextResponse(JSON.stringify({ success: "Added Item" }), {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new NextResponse(JSON.stringify({ error: "Failed to fetch item" }), {
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

export async function DELETE(req: NextRequest) {
  // TODO: ADD one item to pantry

  try {
  } catch (error) {}
}
