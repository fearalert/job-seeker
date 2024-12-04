"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const AuthHeader = ({ title }: {title:string }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const { user } = useSelector((state: RootState) => state.user);

  const firstLetter = user?.name;

  const slicedName = firstLetter?.slice(0, 1)

  const handleLogout = () => {
    console.log("Logout CLiked")
  };

  return (
    <header className="w-full bg-slate-50 flex flex-row justify-between items-center text-center px-12 py-4">
      <h1 className="text-3xl font-semibold text-primary">{title}</h1>

      <div className="relative">
        <div
          className="flex items-center justify-center bg-primary rounded-full shadow-xs w-8 h-8 font-semibold text-center cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <h1 className="text-lg font-semibold text-white">{slicedName}</h1>
        </div>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md">
            <ul className="py-2 text-start">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => router.push("/profile")}
              >
                Profile
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => router.push("/update-password")}
              >
                Update Password
              </li>
              <li
                className="px-4 py-2 text-destructive hover:bg-red-100 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default AuthHeader;
