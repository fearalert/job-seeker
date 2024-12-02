"use client"

import React from "react";
import { Calendar, ChevronUp, Edit2Icon, EditIcon, FileIcon, Home, HomeIcon, Inbox, LockIcon, LogOutIcon, Search, Settings, SheetIcon, ShieldHalfIcon, User2, User2Icon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ROLES } from "@/constants";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";

type User = {
    role: string;
  };
  
  const AppSidebar = ({ user }: { user: User }) => {
  const sidebarItems = [
    { label: "Dashboard", url: "/dashboard", icon: HomeIcon },
    { label: "My Profile", url: "#", icon: User2Icon },
    { label: "Update Profile", url: "#", icon: EditIcon },
    { label: "Update Password", url: "#", icon: LockIcon },
  ];

  if (user && user.role === ROLES.EMPLOYER) {
    sidebarItems.push(
      { label: "Post New Job", url: "#", icon: Edit2Icon },
      { label: "My Jobs", url: "#", icon: ShieldHalfIcon },
      { label: "Applications", url: "#", icon: FileIcon }
    );
  } else if (user && user.role === ROLES.JOB_SEEKER) {
    sidebarItems.push(
      { label: "My Applications", url: "#", icon: FileIcon },
      { label: "Jobs", url: "#", icon: SheetIcon }
    );
  }


  const router = useRouter();
  const currentPath = usePathname();

  return (
        <Sidebar collapsible="icon">
          <SidebarContent>
            <SidebarGroup>
              <div className="bg-primary rounded-md w-full px-4 py-2 mb-8 mt-5">
                <h2 className="font-bold text-white text-sm">Rohan Dhakal</h2>
                <span className="text-zinc-300 font-normal text-xs">
                  example@exampleone.com
                </span>
              </div>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarItems.map((item) => {
                    const isActive = currentPath === item.url;
                    return (
                      <SidebarMenuItem key={item.label}>
                        <SidebarMenuButton asChild>
                          <Link href={item.url} className={`flex items-center gap-2 p-2 rounded-lg ${
                                isActive
                                  ? "bg-primary hover:bg-primary text-white font-bold active:bg-primary active:hover:bg-primary"
                                  : "hover:bg-primary/20 hover:text-primary text-gray-700"
                              }`}>
                              <item.icon className="w-5 h-5" />
                              <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="mb-8">
            <SidebarMenu>
              <SidebarMenuItem key={"logout"}>
                <Button
                  asChild
                  className="bg-destructive text-white hover:bg-red-800 rounded-full text-center h-10 flex items-center justify-center after:bg-destructive"
                >
                  <Link href={"#"}>
                    <LogOutIcon />
                    <span>Log Out</span>
                  </Link>
                </Button>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
      );
    };
    
export default AppSidebar;