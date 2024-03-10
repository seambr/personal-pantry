"use client"

import { supabase } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function LogoutPage() {
  const router = useRouter()
  useEffect(() => {
    async function logout() {
      const { error }: { error: AuthError | null } =
        await supabase.auth.signOut()
    }

    logout()
    // FIXME: Couldnt find any other way to stop the persisting user data even when session is gone
    // seems to just be a race condition
    setTimeout(() => {
      router.replace("/")
      router.refresh()
    }, 50)
  }, [])

  router.refresh()
  return <>Logging Out</>
}
