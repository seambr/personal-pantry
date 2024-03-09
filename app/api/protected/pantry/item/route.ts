import { NextResponse } from "next/server"
import pool from "../../../db"

export async function GET(req) {
  // TODO: GET one item from pantry by ID

  try {
    const { rows } = await pool.query("SELECT * FROM testtable")
    return new NextResponse(JSON.stringify(rows[0] || {}), { status: 200 })
  } catch (error) {
    console.error(error)
    return new NextResponse(JSON.stringify({ error: "Failed to fetch item" }), {
      status: 500,
    })
  }
}

export async function POST(req) {
  // TODO: ADD one item to pantry

  try {
    const { rows } = await pool.query("SELECT * FROM testtable")
    return new NextResponse(JSON.stringify(rows[0] || {}), { status: 200 })
  } catch (error) {
    console.error(error)
    return new NextResponse(JSON.stringify({ error: "Failed to fetch item" }), {
      status: 500,
    })
  }
}
