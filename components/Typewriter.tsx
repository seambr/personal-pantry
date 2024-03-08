"use client"
import Image from "next/image"
import { useRef } from "react"

const { useState, useEffect } = require("react")

const Typewriter = ({ texts, delay }: { texts: string[]; delay: number }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [reversing, setReversing] = useState(false)

  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const widx = currentWordIndex % texts.length
  useEffect(() => {
    if (currentIndex < texts[widx].length && !reversing) {
      const timeout = setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1)
      }, delay)

      return () => clearTimeout(timeout)
    } else if (currentIndex === texts[widx].length && !reversing) {
      setReversing(true)
    } else if (
      currentIndex >= 0 &&
      currentIndex <= texts[widx].length &&
      reversing
    ) {
      const timeout = setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex - 1)
      }, delay)

      return () => clearTimeout(timeout)
    } else if (currentIndex <= 0 && reversing) {
      setReversing(false)
      setCurrentWordIndex((old) => old + 1)
      setCurrentIndex(0)
    }
  }, [currentIndex, reversing, currentWordIndex])

  return (
    <span className="text-2xl font-light relative">
      {texts[widx].slice(0, currentIndex)}
    </span>
  )
}

export default Typewriter
