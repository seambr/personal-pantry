import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export const GET = async function myApiRoute(req) {
  const supabase = createClient()
  let { data: test, error1 } = await supabase.from("test").select("*")
  let { data: user, error2 } = await supabase.auth.getUser()
  return NextResponse.json({ protected: test, user: user })
}
