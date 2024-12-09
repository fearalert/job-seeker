"use client";

import React, { useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "../ui/card";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { ROLES } from "@/constants";
import { 
  fetchEmployerApplicationsLength, 
  fetchJobSeekerApplicationsLength 
} from "@/store/slices/application.slice";
import { fetchTotalJobsPosted, fetchTotalNiches } from "@/store/slices/job.slice";

const DashboardCards = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { totalJobsPosted, totalNiches, loading: jobsLoading } = useSelector((state: RootState) => state.jobs);
  const { user, loading: userLoading } = useSelector((state: RootState) => state.user);
  const { totalApplications, loading: applicationsLoading } = useSelector((state: RootState) => state.application);

  // Fetch data based on the user role
  useEffect(() => {
    if (user?.role === ROLES.EMPLOYER) {
      dispatch(fetchEmployerApplicationsLength());
      dispatch(fetchTotalJobsPosted());
      dispatch(fetchTotalNiches());
    } else if (user?.role === ROLES.JOB_SEEKER) {
      dispatch(fetchJobSeekerApplicationsLength());
    }
  }, [dispatch, user?.role]);

  if (jobsLoading || userLoading || applicationsLoading) {
    return <div className="text-center text-lg font-semibold">Loading Data...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Applications */}
      <Card>
        <CardHeader>
          <CardTitle>Total Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-6xl font-bold text-zinc-600">
            {applicationsLoading ? "Loading..." : totalApplications}
          </CardDescription>
        </CardContent>
      </Card>

      {/* Total Jobs Posted (Only for Employers) */}
      {user?.role === ROLES.EMPLOYER && (
        <Card>
          <CardHeader>
            <CardTitle>Total Jobs Posted by Me</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-6xl font-bold text-zinc-600">
              {jobsLoading ? "Loading..." : totalJobsPosted}
            </CardDescription>
          </CardContent>
        </Card>
      )}

      {/* Total Niches */}
      <Card>
        <CardHeader>
          <CardTitle>Total Niches</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-6xl font-bold text-zinc-600">
            {jobsLoading
              ? "Loading..."
              : user?.role === ROLES.EMPLOYER
              ? totalNiches
              : totalApplications // Default fallback for Job Seekers
            }
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCards;
