"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

const navItems = [
  { name: "Continents", href: "/" },
  { name: "Countries", href: "/countries" },
]

export function Nav() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <nav className="w-full bg-background border-b">
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        <Link href="/" className="text-2xl font-bold text-primary">
          DataVis
        </Link>
        <div className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <Button key={item.name} variant="ghost" asChild>
              <Link href={item.href}>{item.name}</Link>
            </Button>
          ))}
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col space-y-4 mt-4">
              {navItems.map((item) => (
                <Button key={item.name} variant="ghost" asChild onClick={() => setIsOpen(false)}>
                  <Link href={item.href}>{item.name}</Link>
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

