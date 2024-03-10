import { redirect } from "next/navigation"

import { createClient } from "@/utils/supabase/server"

export default async function PrivatePage() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  let { data: test, errorr } = await supabase.from("test").select("*")

  if (error || !data?.user) {
    // return <p>Not Logged In</p>
  }

  return (
    <>
      <p>{JSON.stringify(test)}</p>
      {/* <p>Hello {data.user.email}</p> */}
    </>
  )
}
