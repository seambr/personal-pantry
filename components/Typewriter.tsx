"use client"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useRef } from "react"

const { useState, useEffect } = require("react")

const Typewriter = ({
  texts,
  delay,
  holdTime = 200,
  className = "",
}: {
  texts: string[]
  delay: number
  holdTime: number
  className: string
}) => {
  const currentIndexRef = useRef(0)
  const reversingRef = useRef(false)
  const hiddenSpanRef = useRef(null)
  const spanRef = useRef(null)
  const currentWordIndexRef = useRef(0)
  const [helperState, setHelperState] = useState(false)

  function updateSpan(newText, fullText) {
    spanRef.current!.innerText = newText
    if (hiddenSpanRef.current!.innerText !== fullText) {
      hiddenSpanRef.current!.innerText = fullText
      spanRef.current!.style.width = `${
        hiddenSpanRef.current!.getBoundingClientRect().width
      }px`
    }
  }
  function pauseAndRestart(interval) {
    clearInterval(interval)
    setTimeout(() => {
      setHelperState(!helperState)
    }, holdTime)
  }

  useEffect(() => {
    const interval = setInterval(
      () => {
        const reversing = reversingRef.current
        const fullText = texts[currentWordIndexRef.current % texts.length]
        if (!reversing) {
          // NOT REVERSING
          currentIndexRef.current += 1
          const newText = texts[
            currentWordIndexRef.current % texts.length
          ].slice(0, currentIndexRef.current)

          updateSpan(newText, fullText)

          if (currentIndexRef.current >= fullText.length) {
            // REACHED END OF WORD : START REVERSE
            reversingRef.current = true
            // PAUSE FOR A LITTLE
            pauseAndRestart(interval)
          }
        } else {
          // REVERSING
          currentIndexRef.current -= 1
          const newText = texts[
            currentWordIndexRef.current % texts.length
          ].slice(0, currentIndexRef.current)

          updateSpan(newText, fullText)

          if (currentIndexRef.current <= 0) {
            // NEW WORD
            reversingRef.current = false
            currentIndexRef.current = 0
            currentWordIndexRef.current += 1
            pauseAndRestart(interval)
          }
        }
      },
      !reversingRef.current ? delay : Math.floor(delay * 0.65)
    )

    return () => clearInterval(interval)
  }, [helperState])

  return (
    <>
      <span
        className={cn("text-2xl font-light relative h-5", className)}
        ref={spanRef}
      ></span>
      <span
        className={cn(
          "text-2xl font-light relative h-5 max-w-fit inline p-0 m-0",
          className + " opacity-0"
        )}
        ref={hiddenSpanRef}
      ></span>
    </>
  )
}

export default Typewriter
