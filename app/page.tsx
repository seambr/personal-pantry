import Image from "next/image"

import HomeTile from "@/components/HomeTile"
import { useEffect, useState } from "react"
import Typewriter from "@/components/Typewriter"
import { Button } from "@/components/ui/button"

const detailArray = [
  "Track your macros.",
  "Keep track of whats in your food.",
  "Live healthier.",
  "Scan your receipts.",
  "View your progress.",
  "Share your favorite recipes.",
]

export default function Home() {
  return (
    <main className="flex flex-col gap-5  relative items-center justify-center flex-grow">
      <span className="text-xl font-light relative text-center w-[600px] sm:text-3xl">
        You are what you eat, <span className="font-bold">so eat good</span>.
      </span>

      <Typewriter
        texts={detailArray}
        delay={150}
        holdTime={500}
        className="text-md text-left opacity-50"
      />
      <Button>
        <a href="/api/auth/login">Get Started</a>
      </Button>
    </main>
  )
}
