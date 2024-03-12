"use client"
import React from "react"
import Link from "next/link"
import { Button } from "./ui/button"

import {
  HomeIcon,
  MagnifyingGlassIcon,
  BookmarkIcon,
  ReaderIcon,
  RocketIcon,
} from "@radix-ui/react-icons"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Table, TableBody, TableCaption, TableCell, TableRow } from "./ui/table"
import { cn } from "@/lib/utils"
import Logo from "./icons/Logo"
import Image from "next/image"
import { createClient } from "@/utils/supabase/server"
import { usePathname } from "next/navigation"
import { User } from "@supabase/supabase-js"

const navLinks = [
  { href: "/", name: "Home", icon: <HomeIcon className="w-8 h-8" /> },
  {
    href: "/search",
    name: "Food Search",
    icon: <MagnifyingGlassIcon className="w-8 h-8" />,
  },
  {
    href: "/fridge",
    name: "Fridge",
    icon: <BookmarkIcon className="w-8 h-8" />,
  },
  { href: "/menu", name: "Menu", icon: <ReaderIcon className="w-8 h-8" /> },
  { href: "/cook", name: "Cook", icon: <RocketIcon className="w-8 h-8" /> },
]

function NavMenu({ className = "", user }: { className: string; user: User }) {
  const pathname = usePathname()

  const pathActive = (href: string) => href === pathname

  return (
    <div
      className={cn(
        "absolute w-full bottom-5 md:relative flex items-center pt-10 pb-5 justify-center px-20 z-50",
        className
      )}
    >
      <Link href={"/"} className="fixed top-5 ml-5 left-0 lg:ml-20">
        <Logo fill="white" className="w-32" />
      </Link>
      <div
        className={`flex gap-2 shadow-md p-1 rounded-md border border-secondary w-fit m-auto bg-primary-foreground`}
      >
        {navLinks.map((e, idx) => (
          <Link href={e.href} key={idx}>
            <div
              className={`rounded-md p-1 px-3 hover:bg-secondary cursor-pointer ${
                pathActive(e.href) ? "bg-secondary" : ""
              }`}
            >
              <span className="hidden sm:inline">{e.name}</span>
              <span className="inline sm:hidden">{e.icon}</span>
            </div>
          </Link>
        ))}
      </div>
      {user ? (
        <Popover>
          <PopoverTrigger asChild>
            <Image
              className="w-10 h-10 rounded-full overflow-hidden cursor-pointer lg:block fixed top-5 right-0 mr-5 lg:mr-20"
              src={user.image_link || "/images/default_icon.jpg"}
              alt="user image"
              width={100}
              height={100}
            />
          </PopoverTrigger>
          <PopoverContent>
            <ProfileTable user={user} />
          </PopoverContent>
        </Popover>
      ) : (
        <Link
          href="/login"
          className="hidden lg:block cursor-pointer absolute right-0 mr-20"
        >
          <Button className="">Login</Button>
        </Link>
      )}
    </div>
  )
}

function ProfileTable({ user }: { user: any }) {
  return (
    <Table>
      <TableCaption>
        {user.name}
        <br />
        {user.email}
      </TableCaption>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium text-center cursor-pointer rounded-md">
            <Link href="/logout">Logout</Link>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default NavMenu
