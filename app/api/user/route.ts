// /app/api/user/route.ts
import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export const GET = async function getUser(req) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ protected: "Not Authorized" })
  }

  return NextResponse.json(user)
}
