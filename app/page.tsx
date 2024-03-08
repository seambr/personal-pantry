import Image from "next/image"

import HomeTile from "@/components/HomeTile"
import { useEffect, useState } from "react"
import Typewriter from "@/components/Typewriter"

const detailArray = [
  "Track Macros.",
  "Scan Your Receipts.",
  "Keep Track of Whats in Your Food",
]

export default function Home() {
  return (
    <main className="flex flex-col justify-center h-[800px] gap-5 p-20 relative items-center">
      <span className="text-3xl font-light relative -top-36">
        You are what you eat, so eat good. Keep Track of whats in your food
      </span>

      <Typewriter texts={detailArray} delay={100} />
    </main>
  )
}
