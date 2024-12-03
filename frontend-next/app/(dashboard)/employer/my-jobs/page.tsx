"use client";

import { fetchMyJobs } from "@/store/slices/job.slice";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const MyJobsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { myJobs, loading, error } = useSelector((state: RootState) => state.jobs);

  useEffect(() => {
    dispatch(fetchMyJobs());
  }, [dispatch]);

  if (loading) {
    return <div>Loading your jobs...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Posted Jobs</h1>
      {myJobs.length === 0 ? (
        <p>You have not posted any jobs yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {myJobs.map((job) => (
            <div key={job.id} className="p-4 border rounded shadow-sm">
              <h2 className="text-xl font-semibold">{job.jobTitle}</h2>
              <p className="text-gray-600">{job.organizationName}</p>
              <p className="text-gray-500">Location: {job.location}</p>
              <p className="text-gray-500">Salary: ${job.salary}</p>
              <p className="mt-2 text-sm">{job.jobIntroduction}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyJobsPage;
