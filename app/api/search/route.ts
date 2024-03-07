import { NextRequest, NextResponse } from "next/server"
import { SearchCriteria } from "@/interfaces/FoodInterfaces"
export async function POST(req: NextRequest) {
  // TODO: Fetch list of items form food api
  const r = await req.json()
  const query: SearchCriteria = r.query

  const url = `https://api.nal.usda.gov/fdc/v1/foods/search?`

  const params = new URLSearchParams({
    api_key: "DEMO_KEY",
  })

  const api_res = await fetch(url + params, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query.query,
      dataType: ["Branded"],
      pageSize: 25,
      pageNumber: 2,
    }),
  })
  const data = await api_res.json()

  return NextResponse.json(data)
}
