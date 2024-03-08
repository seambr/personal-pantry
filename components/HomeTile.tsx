"use client"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"

import React from "react"

function HomeTile({ children, src = "", className = "" }) {
  return (
    <div
      className={cn(
        "relative tile-container w-full overflow-visible bg-secondary flex items-center justify-center rounded-md p-5",
        className
      )}
    >
      <h2 className="font-bold text-2xl z-10 absolute m-5 top-0 far-text italic">
        {children}
      </h2>
      <Image
        src={src}
        alt="Image"
        className="rounded-md object-contain h-full scale-[1.4] absolute"
        width={500}
        height={500}
      />
    </div>
  )
}

export default HomeTile
