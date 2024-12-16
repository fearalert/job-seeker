"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleJob, clearAllJobErrors } from "@/store/slices/job.slice";
import { AppDispatch, RootState } from "@/store/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Briefcase, DollarSign, Users, Globe, Link as LinkIcon, ArrowLeftIcon, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { formatDate } from "@/lib/utils";
import LoadingView from "@/app/loading";
import { fetchJobSeekerApplications, postApplication } from "@/store/slices/application.slice";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

export default function DetailSingleJobCard() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const dispatch = useDispatch<AppDispatch>();
  const { singleJob: job, loading, error } = useSelector((state: RootState) => state.jobs);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.user);
  const { applications } = useSelector((state: RootState) => state.application);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [coverLetterFile, setCoverLetterFile] = useState<string | undefined>(user?.coverLetter);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const router = useRouter();

  const hasApplied = !!applications.find((app) => app.jobInfo.jobId === job?.id);
  const isDeleted = !!applications.find((app) => app.deletedBy.jobSeeker);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleJob(id));
      if(isAuthenticated) {
        dispatch(fetchJobSeekerApplications());
      }
    }

    return () => {
      dispatch(clearAllJobErrors());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (job && applications) {
      applications.some((app) => app.jobInfo.jobId === job.id);
    }
  }, [job, applications]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleApply = async () => {
    if (hasApplied || isLoading) return;
  
    setIsLoading(true);
  
    const formData = new FormData();
  
    const applicationData = {
      name: user?.name,
      email: user?.email,
      coverLetter: coverLetterFile ? coverLetterFile : user?.coverLetter,
      phone: user?.phone,
      resume: resumeFile ? resumeFile : user?.resume,
      address: user?.address,
      niches: user?.niches,
      jobID: job?.id,
    };
  
    Object.entries(applicationData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item, index) => formData.append(`${key}[${index}]`, item));
      } else if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
  
    const jobID = job?.id || "";
  
    try {
      const response: any = await dispatch(postApplication(formData, jobID));
  
      const successMessage = response?.data?.message;
  
      setIsModalOpen(false);
      toast({
        variant: "success",
        title: response,
        description: successMessage,
      });
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message;
  
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
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
                type="button"
                variant="primary"
                onClick={() => setIsModalOpen(true)}
                disabled={isExpired || hasApplied || isLoading || isDeleted}
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
              <div className="flex items-center text-zinc-500 font-semibold space-x-2">
                <span>{job.organizationType}</span>
                <Separator className="w-1 h-4 bg-zinc-500" />
                <span>
                  {isExpired ? (
                    <span className="text-red-600 font-bold">Expired</span>
                  ) : (
                    <span>Validity: {formatDate(job.jobValidThrough)}</span>
                  )}
                </span>
              </div>
              <p className="text-zinc-500 mt-4">
                <strong>Posted on:</strong> {formatDate(job.jobPostedOn)}
              </p>
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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cover Letter and Resume</DialogTitle>
          </DialogHeader>
          <Label className="font-bold">Cover Letter
                 <TooltipProvider>
                  <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 ml-1 inline" />
                      </TooltipTrigger>
                      <TooltipContent>
                        Enter the Job Specific Cover Letter
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
          </Label>
          <Textarea
            placeholder="Type your cover letter here..."
            onChange={(e) => setCoverLetterFile(e.target.value)}
            className="mb-4"
          />
          <Label className="font-bold">Resume/CV
              <TooltipProvider>
                  <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 ml-1 inline" />
                      </TooltipTrigger>
                      <TooltipContent>
                        Attach your updated Resume/CV
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
          </Label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => handleFileChange(e, setResumeFile)}
            className="border p-2 mt-2"
          />
          <DialogFooter>
            <Button
              variant="primary"
              onClick={handleApply}
              disabled={isLoading || isDeleted}
            >
              {isLoading ? "Applying..." : "Submit Application"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

