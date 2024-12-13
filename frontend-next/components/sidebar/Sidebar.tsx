"use client"
import React, { useEffect, useState } from "react";
import { 
  Edit2Icon, FileIcon, 
  HomeIcon, LogOutIcon, 
  SheetIcon, ShieldHalfIcon} from "lucide-react";
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
import LogoutDialog from "../logout/LogoutDialog";

const AppSidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const currentPath = usePathname();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  
  const [sidebarItems, setSidebarItems] = useState([
    { label: "Dashboard", url: "/dashboard", icon: HomeIcon },
  ]);

  useEffect(() => {
    const actualUser = user;

    if (actualUser) {
      const additionalItems = actualUser.role === ROLES.EMPLOYER 
        ? [
            { label: "Post New Job", url: "/employer/post", icon: Edit2Icon },
            { label: "My Jobs", url: "/employer/my-jobs", icon: ShieldHalfIcon },
            { label: "Applications", url: "/employer/applications", icon: FileIcon }
          ]
        : actualUser.role === ROLES.JOB_SEEKER
        ? [
            { label: "My Applications", url: "/jobseeker/applications", icon: FileIcon },
            { label: "Jobs", url: "/jobseeker/jobs", icon: SheetIcon }
          ]
        : [];

      setSidebarItems(prev => [
        ...prev.slice(0, 1),
        ...additionalItems
      ]);
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  const handleLogoutButton = () => {
    setIsDialogOpen(true);
  };

  if (!user) {
    console.log("No user found in Sidebar");
    return null;
  }

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
              onClick={handleLogoutButton}
              className="bg-destructive text-white hover:bg-red-800 rounded-full text-center h-10 flex items-center justify-center w-full"
            >
              <LogOutIcon className="mr-2" />
              <span>Log Out</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <LogoutDialog
              isOpen={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              handleLogout={handleLogout}
            />
    </Sidebar>
  );
};

export default AppSidebar;