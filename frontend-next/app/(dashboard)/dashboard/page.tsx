"use client";

import DashboardCards from '@/components/dashboard/DashboardCard';
import JobPostChart from '@/components/dashboard/JobPostsCard';
import AuthHeader from '@/components/navbar/AuthenticatedHeader';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const totalApplications = 500;
  const totalNiches = 20;
  const jobPostFrequency = [12, 15, 8, 10, 5, 7, 15, 14, 18, 20, 13, 10];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  const { myJobs } = useSelector((state: RootState) => state.jobs);

  const totalJobsPosted = myJobs.length; 

  return (
    <>
      <AuthHeader title='Dashboard'/>
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
