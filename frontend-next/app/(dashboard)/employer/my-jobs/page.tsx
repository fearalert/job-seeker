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
import { Trash2, Eye } from 'lucide-react';
import { deleteJob, fetchMyJobs, Job } from '@/store/slices/job.slice';
import { AppDispatch, RootState } from '@/store/store';
import { formatDate } from '@/lib/utils';

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

  if (loading) return <div className="text-center py-4">Loading jobs...</div>;
  if (error) return <div className="text-destructive text-center py-4">Error: {error}</div>;

  return (
    <div className="px-12 py-6">
      <h1 className="text-3xl text-primary font-bold mb-6">My Posted Jobs</h1>
      
      {myJobs.length === 0 ? (
        <div className="flex items-center justify-center text-center text-destructive">No jobs posted yet</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-sm shadow-xs min-w-[320px] transition-shadow bg-background hover:bg-slate-50">
              <CardHeader className='py-0'>
                <CardTitle className="text-lg text-primary">{job.jobTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-500 font-semibold pt-0">{job.jobNiche} | {job.location}</p>
                <p className="mt-2 text-sm text-zinc-400 font-medium">
                  <strong>Salary:  </strong>NRS. {job.salary.toLocaleString()}
                </p>
                <p className="text-sm text-zinc-400 mt-1">
                <strong>Posted:  </strong>{formatDate(job.jobPostedOn)}
                </p>
              </CardContent>
              <CardFooter className="flex gap-2 justify-between">
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