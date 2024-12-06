"use client";

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Trash2, Eye, FileIcon } from 'lucide-react';
import { deleteJob, fetchMyJobs, Job } from '@/store/slices/job.slice';
import { AppDispatch, RootState } from '@/store/store';
import { formatDate } from '@/lib/utils';
import LoadingView from '@/app/loading';
import AuthHeader from '@/components/navbar/AuthenticatedHeader';

const MyJobsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { myJobs, loading, error } = useSelector((state: RootState) => state.jobs);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    dispatch(fetchMyJobs());
  }, [dispatch]);

  const handleDeleteJob = (jobId: string) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      dispatch(deleteJob(jobId));
    }
  };

  const handleViewJobDetails = (job: Job) => {
    setSelectedJob(job);
  };

  const closeJobDetailsModal = () => {
    setSelectedJob(null);
  };

  if (loading) return <LoadingView />;
  if (error) return <div className="text-destructive text-center py-4">Error: {error}</div>;

  return (
    <div className="w-full">
       <AuthHeader title='My Jobs'/>
      {myJobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center text-red-400 mt-24">
          <FileIcon className="w-24 h-24 mb-6" />
          <p>No jobs posted yet</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
          {myJobs.map((job) => (
            <Card key={job.id} className="bg-background hover:bg-background">
              <CardHeader className='py-0'>
                <CardTitle className="text-lg text-primary">{job.jobTitle}</CardTitle>
              </CardHeader>
              <CardContent className='flex flex-col items-start text-start justify-start gap-2'>
              <p className="text-sm text-zinc-500 font-semibold pt-0">{job.jobNiche} | {job.location}</p>
                <p className="mt-2 text-sm text-zinc-400 font-medium">
                  <strong>Salary:  </strong>NRS. {job.salary.toLocaleString()}
                </p>
                <p className="text-sm text-zinc-400 mt-1">
                <strong>Posted:  </strong>{formatDate(job.jobPostedOn)}
                </p>
              </CardContent>
              <CardFooter className="gap-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleViewJobDetails(job)}
                  className='text-zinc-500'
                >
                  <Eye className="mr-2 h-4 w-4" /> View Details
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => handleDeleteJob(job.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {selectedJob && (
        <Dialog open={!!selectedJob} onOpenChange={closeJobDetailsModal}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedJob.jobTitle}</DialogTitle>
              <DialogDescription>
                {selectedJob.jobIntroduction}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div>
                <h3 className="font-semibold text-lg border-b pb-2 mb-2">Job Details</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm"><strong>Type:</strong> {selectedJob.jobType}</p>
                    <p className="text-sm"><strong>Niche:</strong> {selectedJob.jobNiche}</p>
                  </div>
                  <div>
                    <p className="text-sm"><strong>Location:</strong> {selectedJob.location}</p>
                    <p className="text-sm"><strong>Salary:</strong> NRS. {selectedJob.salary.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg border-b pb-2 mb-2">Responsibilities</h3>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {selectedJob.jobResponsibilities.map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg border-b pb-2 mb-2">Qualifications</h3>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {selectedJob.jobQualifications.map((qual, index) => (
                    <li key={index}>{qual}</li>
                  ))}
                </ul>
              </div>

              {selectedJob.jobBenefits && selectedJob.jobBenefits.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg border-b pb-2 mb-2">Benefits</h3>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {selectedJob.jobBenefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-lg border-b pb-2 mb-2">How to Apply</h3>
                <p className="text-sm">{selectedJob.howToApply}</p>
              </div>

              {selectedJob.personalWebsite && (
                <div>
                  <h3 className="font-semibold text-lg border-b pb-2 mb-2">Additional Information</h3>
                  <p className="text-sm">
                    <strong>Website:</strong>{' '}
                    <a 
                      href={selectedJob.personalWebsite.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {selectedJob.personalWebsite.title}
                    </a>
                  </p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default MyJobsPage;