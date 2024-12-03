"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin, Briefcase, DollarSign } from "lucide-react";
import LoadingView from "@/app/loading";

const SimilarJobs = () => {
  const { singleJob, jobs, loading } = useSelector((state: RootState) => state.jobs);

  if (!singleJob) return null;

  const similarJobs = jobs.filter(
    (job) => job.jobNiche === singleJob.jobNiche && job.id !== singleJob.id
  );

  // Limit to 4 jobs
  const displayedJobs = similarJobs.slice(0, 4);

  if (loading) {
    return (
      <LoadingView />
    );
  }

  return (
    <div className="space-y-4 my-8 mr-auto bg-secondary/10 w-fit px-4 py-4 rounded-lg">
      <h3 className="text-sm font-semibold text-center items-center text-zinc-500">Similar Jobs</h3>
      {displayedJobs.length === 0 ? (
        <p className="text-zinc-500">No similar jobs found.</p>
      ) : (
        displayedJobs.map((job) => (
          <Card key={job.id} className="bg-white hover:bg-white shadow-sm rounded-lg min-w-[400px] max-w-[400px]">
            <CardHeader className="pb-0">
              <CardTitle className="text-primary">{job.jobTitle}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex items-center text-zinc-500 space-x-2">
                <MapPin size={16} className="text-primary" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center text-zinc-500 space-x-2">
                <Briefcase size={16} className="text-primary" />
                <span>{job.jobType}</span>
              </div>
              <div className="flex items-center text-zinc-500 space-x-2">
                <DollarSign size={16} className="text-primary" />
                <span>Rs. {job.salary.toLocaleString()}</span>
              </div>
              <div className="flex justify-end items-center mt-4">
            <Link href={`/jobs/${job.id}`}>
              <Button variant="viewDetails">View Details</Button>
            </Link>
          </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default SimilarJobs;
