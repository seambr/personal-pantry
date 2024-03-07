"use client"
import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

function NavMenu() {
  const pathname = usePathname()

  const pathActive = (href: string) => href === pathname
  const navLinks = [
    { href: "/search", name: "Food Search" },
    { href: "/fridge", name: "Fridge" },
    { href: "/menu", name: "Menu" },
    { href: "/cook", name: "Cook" },
  ]

  return (
    <div
      className={`flex gap-2 shadow-md p-1 rounded-md border border-secondary w-fit m-auto mt-10`}
    >
      {navLinks.map((e, idx) => (
        <div
          className={`rounded-md p-1 px-3 hover:bg-secondary cursor-pointer ${
            pathActive(e.href) ? "bg-secondary" : ""
          }`}
          key={idx}
        >
          <Link href={e.href}>{e.name}</Link>
        </div>
      ))}
    </div>
  )
}

export default NavMenu
