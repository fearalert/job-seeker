"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleJob, clearAllJobErrors } from "@/store/slices/job.slice";
import { AppDispatch, RootState } from "@/store/store";
import { Navbar } from "@/components/navbar/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Briefcase, DollarSign, Users, Globe, BookOpen, Link as LinkIcon, ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function JobDetailsPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const dispatch = useDispatch<AppDispatch>();
  const { singleJob: job, loading, error } = useSelector((state: RootState) => state.jobs);

  const { isAuthenticated } = useSelector((state: any) => state.user);

  const router = useRouter()

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleJob(id));
    }

    return () => {
      dispatch(clearAllJobErrors());
    };
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span>Loading job details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span>{error}</span>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span>No job found.</span>
      </div>
    );
  }

  const currentDate = new Date();
  const validThroughDate = new Date(job.jobValidThrough);
  const isExpired = isNaN(validThroughDate.getTime()) || validThroughDate < currentDate;


  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
        <Card className="bg-background hover:bg-background shadow-sm rounded-lg">
          <ArrowLeftIcon className="text-primary mx-4 my-4 cursor-pointer" onClick={() => router.back()}/>
          <CardHeader className="flex flex-row justify-between">
            <CardTitle className="text-primary text-2xl">{job.jobTitle}</CardTitle>
            {!isAuthenticated && (
              <Button
                type="submit"
                variant="primary"
                className={`flex flex-row items-end justify-end my-4`}
                disabled={isExpired ? true : false}
              >
                {isExpired ? "Expired" : "Apply Now"}
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center text-zinc-500 font-semibold space-x-2">
                <span>{job.organizationType}</span>
                <Separator className="w-1 h-4 bg-zinc-500" />
                <span>
                  {isExpired ? (
                    <span className="text-red-600 font-bold">Expired</span>
                  ) : (
                    `Validity: ${formatDate(job.jobValidThrough)}`
                  )}
                </span>
              </div>
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
              <div className="flex items-center text-zinc-500 space-x-2">
                <Users size={16} className="text-primary" />
                <span>Hiring Multiple Candidates: {job.hiringMultipleCandidates ? "Yes" : "No"}</span>
              </div>
              <div className="flex items-center text-zinc-500 space-x-2">
                <Globe size={16} className="text-primary" />
                <span>Niche: {job.jobNiche}</span>
              </div>
              <p className="text-zinc-600">
                <strong className="text-primary">Description:</strong>
                <br />
                <br />
                {job.jobIntroduction}
              </p>
              <h3 className="text-md text-primary font-semibold mt-4">Responsibilities</h3>
              <ul className="list-disc ml-6 space-y-1">
                {job.jobResponsibilities.map((resp, index) => (
                  <li key={index} className="text-zinc-500">
                    {resp}
                  </li>
                ))}
              </ul>
              <h3 className="text-md text-primary font-semibold mt-4">Qualifications</h3>
              <ul className="list-disc ml-6 space-y-1">
                {job.jobQualifications.map((qual, index) => (
                  <li key={index} className="text-zinc-500">
                    {qual}
                  </li>
                ))}
              </ul>
              <h3 className="text-md text-primary font-semibold mt-4">Benefits</h3>
              <ul className="list-disc ml-6 space-y-1">
                {job.jobBenefits.map((benefit, index) => (
                  <li key={index} className="text-zinc-500">
                    {benefit}
                  </li>
                ))}
              </ul>
              <h3 className="text-md text-primary font-semibold mt-4">How to Apply</h3>
              <p className="text-zinc-600">{job.howToApply}</p>
              {job.personalWebsite && (
                <div className="flex items-center text-zinc-500 space-x-2 mt-4">
                  <LinkIcon size={16} className="text-primary" />
                  <a
                    href={job.personalWebsite.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-primary"
                  >
                    {job.personalWebsite.title}
                  </a>
                </div>
              )}
              <p className="text-zinc-500 mt-4">
                <strong>Posted By:</strong> {job.organizationName}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
