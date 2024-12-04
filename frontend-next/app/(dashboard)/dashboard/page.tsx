"use client";

import DashboardCards from '@/components/dashboard/DashboardCard';
import JobPostChart from '@/components/dashboard/JobPostsCard';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const totalApplications = 500;
  const totalJobsPosted = 150; 
  const totalNiches = 20;
  const jobPostFrequency = [12, 15, 8, 10, 5, 7, 15, 14, 18, 20, 13, 10];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };


  const { user } = useSelector((state: RootState) => state.user);


  const firstLetter = user?.name;

  const slicedName = firstLetter?.slice(0, 1)

  return (
    <>
       <header className="w-full bg-slate-50 flex flex-row justify-between items-center text-center px-12 py-4">
      <h1 className="text-3xl font-semibold text-primary">Dashboard</h1>

      <div className="relative">
        <div
          className="flex items-center justify-center bg-primary rounded-full shadow-xs w-8 h-8 font-semibold text-start cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <h1 className="text-lg font-semibold text-white">{slicedName}</h1>
        </div>

        {isDropdownOpen && (
          <div className="absolute right-0 text-start mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md">
            <ul className="py-2">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-zinc-500"
                onClick={() => router.push("/profile")}
              >
                Profile
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-zinc-500"
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
      <div className="container mx-auto p-6">
        <DashboardCards
          totalApplications={totalApplications}
          totalJobsPosted={totalJobsPosted}
          totalNiches={totalNiches}
        />
        <div className="mt-8 w-full">
          <h3 className="text-lg font-semibold text-primary mb-6">Jobs Frequency</h3>
          <JobPostChart data={jobPostFrequency} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
