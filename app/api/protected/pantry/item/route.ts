import { NextRequest, NextResponse } from "next/server"
// import pool from "../../../db"
import { createClient } from "@/utils/supabase/server"
import { FoodItemSQL } from "@/interfaces/FoodInterfaces"
import { calcLength } from "framer-motion"

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient()

    const body = await req.json()

    const { data, error } = await supabase
      .from("FoodItems")
      .insert([body?.data])
      .select()
    if (error) {
      console.log(error)
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
  // GET users entire pantry, BUT NOT ALL THE NUTRIENT DETAILS
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
  // ADD one item to pantry

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
  try {
    const supabase = createClient();

    // Parse the request URL to get the id of the item to delete
    const url = req.nextUrl;
    const searchParams = url.searchParams;
    const itemId = searchParams.get("id");
    

    if (!itemId) {
      return new NextResponse(
        JSON.stringify({ error: "Item ID is required" }),
        { status: 400 }
      );
    }

    // Perform the delete operation
    const { data, error } = await supabase
      .from("FoodItems")
      .delete()
      .eq("id", itemId);

    if (error) {
      console.error("Delete error:", error);
      return new NextResponse(
        JSON.stringify({ error: "Failed to delete item" }),
        { status: 500 }
      );
    }

    return new NextResponse(
      JSON.stringify({ success: `Deleted item with ID: ${itemId}`, ok:true}),
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to delete item" }),
      { status: 500 }
    );
  }
}