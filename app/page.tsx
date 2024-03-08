import Image from "next/image"

import HomeTile from "@/components/HomeTile"
import { useEffect, useState } from "react"
import Typewriter from "@/components/Typewriter"

const detailArray = [
  "Track your macros.",
  "Keep track of whats in your food.",
  "Live healthier.",
  "Scan your receipts.",
]

export default function Home() {
  return (
    <main className="flex flex-col justify-center h-[800px] gap-5 p-20 relative items-center">
      <span className="text-3xl font-light relative text-center w-[600px]">
        You are what you eat, <span className="font-bold">so eat good</span>.
      </span>

      <Typewriter
        texts={detailArray}
        delay={150}
        holdTime={500}
        className="text-md indent-5 text-left opacity-50"
      />
    </main>
  )
}
