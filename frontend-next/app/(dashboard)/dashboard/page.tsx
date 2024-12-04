"use client";

import DashboardCards from '@/components/dashboard/DashboardCard';
import JobPostChart from '@/components/dashboard/JobPostsCard';
import React from 'react';

const Dashboard = () => {
  const totalApplications = 500;
  const totalJobsPosted = 150; 
  const totalNiches = 20;
  const jobPostFrequency = [12, 15, 8, 10, 5, 7, 15, 14, 18, 20, 13, 10];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-primary mb-6">Dashboard</h1>
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
  );
};

export default Dashboard;
