import { NextRequest, NextResponse } from "next/server"
// import pool from "../../../db"
import { createClient } from "@/utils/supabase/server"

// export async function GET(req) {
//   // TODO: GET one item from pantry by ID

//   try {
//     const { rows } = await pool.query("SELECT * FROM testtable")
//     return new NextResponse(JSON.stringify(rows[0] || {}), { status: 200 })
//   } catch (error) {
//     console.error(error)
//     return new NextResponse(JSON.stringify({ error: "Failed to fetch item" }), {
//       status: 500,
//     })
//   }
// }

export async function POST(req: NextRequest) {
  // TODO: ADD one item to pantry

  try {
    const supabase = createClient()

    const body = await req.json()

    console.log(body?.data)
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
