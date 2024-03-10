"use client"
import { AnimatePresence, motion } from "framer-motion"
import React, { createContext, useContext, useRef, useState } from "react"

// Create Context
const AlertContext = createContext()

// Provider Component
export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ show: false, message: "" })
  const timeoutRef = useRef(null)

  function showAlert(_alert) {
    if (alert.show) {
      clearTimeout(timeoutRef.current)
      setAlert({ show: false, message: "" })
      const newTimeoutId = setTimeout(() => {
        setAlert(_alert)
      }, 150)
      timeoutRef.current = newTimeoutId
    } else {
      setAlert(_alert)
      const newTimeoutId = setTimeout(() => {
        setAlert({ show: false, message: "" })
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
            className="alert-wrapper fixed top-0 w-full z-50 bg-destructive text-center h-8 flex items-center justify-center"
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
