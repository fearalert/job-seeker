"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleJob, clearAllJobErrors } from "@/store/slices/job.slice";
import { AppDispatch, RootState } from "@/store/store";
import { Navbar } from "@/components/navbar/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Briefcase, DollarSign, Users, Globe, BookOpen, Link as LinkIcon, ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { formatDate } from "@/lib/utils";
import LoadingView from "@/app/loading";
import { postApplication } from "@/store/slices/application.slice";

export default function DetailSingleJobCard() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const dispatch = useDispatch<AppDispatch>();
  const { singleJob: job, loading, error } = useSelector((state: RootState) => state.jobs);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.user);

  const [isLoading, setIsLoading] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleJob(id));
    }

    return () => {
      dispatch(clearAllJobErrors());
    };
  }, [id, dispatch]);

  const handleApply = async () => {
    if (hasApplied) return;

    setIsLoading(true);

    const applicationData = {
      name: user?.name,
      email: user?.email,
      coverLetter: user?.coverLetter,
      phone: user?.phone,
      resume: user?.resume,
      address: user?.address,
      niches: user?.niches,
      jobID: job?.id,
    };

    const formData = new FormData();

    Object.entries(applicationData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item, index) => formData.append(`${key}[${index}]`, item));
      } else if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    const jobID = job?.id || ""
    try {
      await dispatch(postApplication(formData, jobID));
      setHasApplied(true); // Mark as applied after success
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return <LoadingView />;
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
      <div className="max-w-4xl ml-auto p-6 my-6">
        <Card className="bg-background hover:bg-background shadow-sm rounded-lg">
          <ArrowLeftIcon className="text-primary mx-4 my-4 cursor-pointer" onClick={() => router.back()} />
          <CardHeader className="flex flex-row justify-between items-center text-center py-0 m-0">
            <CardTitle className="text-primary text-3xl text-center">{job.jobTitle}</CardTitle>
            {isAuthenticated && (
              <Button
                type="submit"
                variant="primary"
                onClick={handleApply}
                disabled={isExpired || hasApplied || isLoading}
              >
                {isExpired
                  ? "Expired"
                  : hasApplied
                  ? "Already Applied"
                  : isLoading
                  ? "Applying..."
                  : "Apply Now"}
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Job details */}
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
