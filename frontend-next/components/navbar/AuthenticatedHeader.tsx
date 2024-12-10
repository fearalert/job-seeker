"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Edit2Icon, FileIcon, HomeIcon, LockIcon, LogOutIcon, SheetIcon, ShieldHalfIcon, UserIcon } from "lucide-react";
import { ROLES } from "@/constants";

const AuthHeader = ({ title }: {title:string }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const { user } = useSelector((state: RootState) => state.user);

  const firstLetter = user?.name;

  const slicedName = firstLetter?.slice(0, 1);

  const [items, setItems] = useState([
    { label: "Dashboard", url: "/dashboard", icon: HomeIcon },
  ]);

  useEffect(() => {
    console.log("Sidebar - User Raw:", user);

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

      setItems(prev => [
        ...prev.slice(0,1),
        ...additionalItems
      ]);
    }
  }, [user]);

  const handleLogout = () => {
    console.log("Logout CLiked")
  };

  return (
    <header className="w-full bg-slate-50 flex flex-row justify-between items-center text-center px-4 md:px-12 py-4 z-10">
      <h1 className="text-xl md:text-3xl font-semibold text-primary">{title}</h1>

      <div className="relative">
        <div
          className="flex items-center justify-center bg-primary rounded-full shadow-xs w-8 h-8 font-semibold text-center cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <h1 className="text-lg font-semibold text-white">{slicedName}</h1>
        </div>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md z-10">
            <ul className="py-2 text-start text-sm">
              {
                items.map((item) => {
                  return (
                    <li
                    key={item.label}
                    className="md:hidden flex flex-row gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => router.push(item.url)}
                  >
                    <item.icon className="w-4 h-4"/> {item.label}
                  </li>
                  )
                })
              }
              <li
                className="flex flex-row gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => router.push("/profile")}
              >
                <UserIcon className="w-4 h-4"/> Profile
              </li>
              <li
                className="flex flex-row gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => router.push("/update-password")}
              >
                <LockIcon className="w-4 h-4"/> Update Password
              </li>
              <li
                className="flex flex-row gap-2 px-4 py-2 text-destructive hover:bg-red-100 cursor-pointer"
                onClick={handleLogout}
              >
               <LogOutIcon className="w-4 h-4"/> Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default AuthHeader;
