"use client"
import { AnimatePresence, motion } from "framer-motion"
import React, { createContext, useContext, useRef, useState } from "react"

// Create Context
const AlertContext = createContext()
interface Alert {
  show: boolean
  message: string
  error: boolean
}
// Provider Component
export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState<Alert>({
    show: false,
    message: "",
    error: false,
  })
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  function showAlert(_alert: Alert) {
    if (alert.show) {
      clearTimeout(timeoutRef.current!)
      setAlert({ show: false, message: "", error: false })
      const newTimeoutId = setTimeout(() => {
        setAlert(_alert)
      }, 150)
      timeoutRef.current = newTimeoutId
    } else {
      setAlert(_alert)
      const newTimeoutId = setTimeout(() => {
        setAlert({ show: false, message: "", error: false })
      }, 2000) // Assuming alertTime is 2000 ms for demonstration
      timeoutRef.current = newTimeoutId
    }
  }

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {children}
    </AlertContext.Provider>
  )
}

export const useAlert = () => useContext(AlertContext)

export function TopAlert() {
  const { alert } = useAlert()

  return (
    <>
      <AnimatePresence>
        {alert.show && (
          <motion.div
            className={`alert-wrapper fixed top-0 w-full z-50 text-center h-8 flex items-center justify-center ${
              alert.error ? "bg-destructive" : "bg-green-500"
            }`}
            initial={{ opacity: 0, y: -64 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -64 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {alert.message}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
