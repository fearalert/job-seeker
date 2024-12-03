"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useRouter } from "next/navigation"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export function Navbar() {
  const router = useRouter();
  return (
    <header className="flex flex-row justify-between px-4 md:px-12 py-4 bg-white z-10">
      <h1 className="font-bold text-xl text-primary cursor-pointer" onClick={() => router.push("/")}>
        JobScan
      </h1>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="hover:text-primary hover:font-semibold">Menu</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 min-w-[300px] lg:w-[400px] lg:grid-cols-1">
                <ListItem href="/auth/candidate/login" title="Candidate Login">
                 Visit to Candidate portal and login
                </ListItem>
                <ListItem href="/auth/candidate/register" title="Candidate Registration">
                 Visit to Candidate portal and Create Account to get started.
                </ListItem>
                <ListItem href="/auth/employer/login" title="Employeer Login">
                 Visit to Employeer portal and login
                </ListItem>
                <ListItem href="/auth/employer/register" title="Employeer Registration">
                 Visit to Employeer portal and Start posting jobs.
                </ListItem>
                <ListItem href="/jobs" title="Browse Jobs" className="md:hidden">
                 Browse trending and matching jobs.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden md:block">
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden md:block">
            <Link href="/jobs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Jobs
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary hover:text-accent-foreground focus:bg-secondary focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-bold text-primary leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
