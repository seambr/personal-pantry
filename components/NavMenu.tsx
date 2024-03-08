"use client"
import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { UserProfile, useUser } from "@auth0/nextjs-auth0/client"
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

function NavMenu({ className = "" }) {
  const pathname = usePathname()
  const user = useUser()
  console.log(user)
  const pathActive = (href: string) => href === pathname
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

  return (
    <div
      className={cn(
        "absolute w-full bottom-5 sm:relative sm:bottom-0",
        className
      )}
    >
      {user.user ? (
        <Popover>
          <PopoverTrigger asChild>
            <Avatar className="absolute top-10 right-32 w-10 h-10 rounded-full overflow-hidden cursor-pointer hidden lg:block">
              <AvatarImage src={user.user.picture!} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent>
            <ProfileTable user={user.user} />
          </PopoverContent>
        </Popover>
      ) : (
        <Button className="absolute top-10 right-20">
          <a href="/api/auth/login">Login</a>
        </Button>
      )}
      <Logo
        fill="white"
        className="w-32 absolute left-32 top-10 hidden lg:block"
      />
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
            <Link href={e.href}>
              <span className="hidden sm:inline">{e.name}</span>
              <span className="inline sm:hidden">{e.icon}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProfileTable({ user }: { user: UserProfile }) {
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
            <a href="/api/auth/logout">Logout</a>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default NavMenu
