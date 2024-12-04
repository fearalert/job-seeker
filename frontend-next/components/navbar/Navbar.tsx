"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="flex flex-row justify-between px-4 md:px-12 py-4 bg-slate-50 z-10">
      <h1
        className="font-bold text-xl text-primary cursor-pointer"
        onClick={() => router.push("/")}
      >
        JobScan
      </h1>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="hover:text-primary hover:font-semibold">
              Menu
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 min-w-[300px] lg:w-[400px] lg:grid-cols-1">
                <ListItem href="/auth/candidate/login" title="Candidate Login">
                  Visit to Candidate portal and login
                </ListItem>
                <ListItem
                  href="/auth/candidate/register"
                  title="Candidate Registration"
                >
                  Visit to Candidate portal and Create Account to get started.
                </ListItem>
                <ListItem href="/auth/employer/login" title="Employeer Login">
                  Visit to Employeer portal and login
                </ListItem>
                <ListItem
                  href="/auth/employer/register"
                  title="Employeer Registration"
                >
                  Visit to Employeer portal and Start posting jobs.
                </ListItem>
                <ListItem
                  href="/jobs"
                  title="Browse Jobs"
                  className="md:hidden"
                >
                  Browse trending and matching jobs.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden md:block">
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  pathname === "/" && "text-primary font-semibold"
                )}
              >
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden md:block">
            <Link href="/jobs" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  pathname === "/jobs" && "text-primary font-semibold"
                )}
              >
                Jobs
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
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
          <div className="text-sm font-bold text-primary leading-none">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
