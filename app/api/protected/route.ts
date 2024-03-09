import { NextResponse } from "next/server"

export const GET = function myApiRoute(req) {
  return NextResponse.json({ protected: "My Secret" })
}
