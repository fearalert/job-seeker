"use client";

import React, { Suspense, lazy } from "react";
import AuthHeader from "@/components/navbar/AuthenticatedHeader";

const DashboardCards = lazy(() => import("@/components/dashboard/DashboardCard"));
const JobPostChart = lazy(() => import("@/components/dashboard/JobPostsCard"));

const Dashboard = () => {
  return (
    <>
      <AuthHeader title="Dashboard" />
      <div className="px-8 py-8 container">
        <Suspense fallback={<div className="text-center text-lg font-semibold">Loading Dashboard Cards...</div>}>
          <DashboardCards />
        </Suspense>
        <Suspense fallback={<div className="text-center text-lg font-semibold">Loading Job Post Chart...</div>}>
          <JobPostChart />
        </Suspense>
      </div>
    </>
  );
};

export default Dashboard;
