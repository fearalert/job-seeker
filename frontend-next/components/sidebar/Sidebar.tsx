"use client"
import React, { useEffect, useState } from "react";
import { 
  Edit2Icon, EditIcon, FileIcon, 
  HomeIcon, LockIcon, LogOutIcon, 
  SheetIcon, ShieldHalfIcon, 
  User2Icon 
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ROLES } from "@/constants";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { logout } from "@/store/slices/user.slice";

const AppSidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const currentPath = usePathname();

  const [sidebarItems, setSidebarItems] = useState([
    { label: "Dashboard", url: "/dashboard", icon: HomeIcon },
    { label: "My Profile", url: "/profile", icon: User2Icon },
    { label: "Update Profile", url: "/update-profile", icon: EditIcon },
    { label: "Update Password", url: "/update-password", icon: LockIcon },
  ]);

  useEffect(() => {
    console.log("Sidebar - User Raw:", user);

    // Ensure we're working with the actual user object
    const actualUser = user;

    if (actualUser) {
      const additionalItems = actualUser.role === ROLES.EMPLOYER 
        ? [
            { label: "Post New Job", url: "/jobs/post", icon: Edit2Icon },
            { label: "My Jobs", url: "/jobs/my-jobs", icon: ShieldHalfIcon },
            { label: "Applications", url: "/jobs/applications", icon: FileIcon }
          ]
        : actualUser.role === ROLES.JOB_SEEKER
        ? [
            { label: "My Applications", url: "/jobseeker/applications", icon: FileIcon },
            { label: "Jobs", url: "/jobseeker/jobs", icon: SheetIcon }
          ]
        : [];

      setSidebarItems(prev => [
        ...prev.slice(0, 4),
        ...additionalItems
      ]);
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  if (!user) {
    console.log("No user found in Sidebar");
    return null;
  }
  console.log("Sidebar", user)


  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <div className="bg-primary rounded-md w-full px-4 py-2 mb-8 mt-5">
            <h2 className="font-bold text-white text-sm">{user.name}</h2>
            <span className="text-zinc-300 font-normal text-xs">
              {user.email}
            </span>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => {
                const isActive = currentPath === item.url;
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild>
                      <Link 
                        href={item.url} 
                        className={`flex items-center gap-2 p-2 rounded-lg ${
                          isActive
                            ? "bg-primary hover:bg-primary text-white font-bold active:bg-primary active:hover:bg-primary"
                            : "hover:bg-primary/20 hover:text-primary text-gray-700"
                        }`}
                      >
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
              onClick={handleLogout}
              className="bg-destructive text-white hover:bg-red-800 rounded-full text-center h-10 flex items-center justify-center w-full"
            >
              <LogOutIcon className="mr-2" />
              <span>Log Out</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;