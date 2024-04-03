import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async function myApiRoute(req: NextRequest) {
  const supabase = createClient();
  let { data: test, error1 } = await supabase.from("test").select("*");
  let { data: user, error2 } = await supabase.auth.getUser();

  const {} = await supabase.auth.signOut();
  if (error1 || error2) {
    return NextResponse.json({ message: "Failed" }, { status: 200 });
  }
  return NextResponse.json({ protected: test, user: user }, { status: 200 });
};
