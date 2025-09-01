/** @format */

// app/dashboard/page.tsx
'use client';
import { Suspense, useState } from 'react';
import AuthHeader from '@/components/navbar/AuthenticatedHeader';
import JobPostChart from '@/components/dashboard/JobPostsCard';
import DashboardCards from '@/components/dashboard/DashboardCard';

const DashboardPage = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  return (
    <>
      <AuthHeader title="Dashboard" />
      <div className="px-8 py-8 container">
        <Suspense
          fallback={
            <div className="text-center text-lg font-semibold">
              Loading Dashboard Cards...
            </div>
          }>
          <DashboardCards />
        </Suspense>

        <div className="mt-8 flex justify-end items-center space-x-2">
          <span className="text-gray-600 font-medium">Select Year:</span>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="border px-3 py-1 rounded-md text-gray-700 focus:ring-2 focus:ring-indigo-400 transition">
            {[2025, 2024, 2023, 2022].map((year) => (
              <option
                key={year}
                value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <Suspense
          fallback={
            <p className="text-gray-500 text-center mt-4">Loading Chart...</p>
          }>
          <JobPostChart selectedYear={selectedYear} />
        </Suspense>
      </div>
    </>
  );
};

export default DashboardPage;
