'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EyeIcon, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { fetchEmployerApplications, fetchJobSeekerApplications, deleteApplication, updateApplicationStatus, Application } from '@/store/slices/application.slice';
import { AppDispatch, RootState } from '@/store/store';
import { ROLES } from '@/constants';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AuthHeader from '@/components/navbar/AuthenticatedHeader';
import LoadingView from '@/app/loading';

interface ApplicationDetailsDialogProps {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
  userRole: string | undefined;
}

const getStatusColor = (status: string) => {
  const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  switch (status.toLowerCase()) {
    case 'pending':
      return { colorClass: 'text-zinc-400', displayStatus: formattedStatus };
    case 'reviewed':
      return { colorClass: 'text-blue-500', displayStatus: formattedStatus };
    case 'shortlisted':
      return { colorClass: 'text-green-500', displayStatus: formattedStatus };
    case 'fulfilled':
      return { colorClass: 'text-red-500', displayStatus: formattedStatus };
    case 'selected':
      return { colorClass: 'text-purple-500', displayStatus: formattedStatus };
    default:
      return { colorClass: 'text-zinc-400', displayStatus: formattedStatus };
  }
};

function ApplicationDetailsDialog({ application, isOpen, onClose, userRole }: ApplicationDetailsDialogProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleStatusChange = async (status: 'shortlisted' | 'fulfilled' | 'selected') => {
    if (application) {
      await dispatch(updateApplicationStatus(application._id, status));
      dispatch(fetchEmployerApplications());
      onClose();
    }
  };

  if (!application) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="xs:max-w-[300px] mx-2">
        <DialogHeader>
          <DialogTitle>{application.jobInfo.jobTitle}</DialogTitle>
          <DialogDescription>
            {userRole === ROLES.EMPLOYER
              ? `Applicant: ${application.jobSeekerInfo.name}`
              : `Employer: ${application.employerInfo.name}`}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="text-zinc-500">
            <h4 className="font-semibold text-zinc-800">Application Status</h4>
            <p className={`font-semibold ${getStatusColor(application.jobInfo.status).colorClass}`}>
              {getStatusColor(application.jobInfo.status).displayStatus}
            </p>
          </div>
          {userRole === ROLES.EMPLOYER && (
            <div className="text-zinc-500">
              <h4 className="font-semibold text-zinc-800">Update Status</h4>
              <Select onValueChange={handleStatusChange} defaultValue={application.jobInfo.status}>
                <SelectTrigger className="w-ful text-zinc-500">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="shortlisted">Shortlisted</SelectItem>
                  <SelectItem value="fulfilled">Rejected</SelectItem>
                  <SelectItem value="selected">Selected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function ApplicationsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { applications, loading, error, message } = useSelector((state: RootState) => state.application);
  const { user } = useSelector((state: RootState) => state.user);
  const { toast } = useToast();
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; applicationId: string | null }>({
    isOpen: false,
    applicationId: null,
  });

  useEffect(() => {
    if (user?.role === ROLES.EMPLOYER) {
      dispatch(fetchEmployerApplications());
    } else if (user?.role === ROLES.JOB_SEEKER) {
      dispatch(fetchJobSeekerApplications());
    }
  }, [dispatch, user?.role]);

  useEffect(() => {
    if (message) {
      toast({
        title: 'Success',
        description: message,
      });
    }
    if (error) {
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    }
  }, [message, error, toast]);

  const handleDeleteApplication = async (id: string) => {
    await dispatch(deleteApplication(id));
    if (user?.role === ROLES.EMPLOYER) {
      dispatch(fetchEmployerApplications());
    } else if (user?.role === ROLES.JOB_SEEKER) {
      dispatch(fetchJobSeekerApplications());
    }
    setDeleteConfirmation({ isOpen: false, applicationId: null });
  };

  const openDeleteConfirmation = (id: string) => {
    setDeleteConfirmation({ isOpen: true, applicationId: id });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingView />
      </div>
    );
  }

  return (
    <div className="w-full">
      <AuthHeader title={user?.role === ROLES.EMPLOYER ? 'Applied Applications' : 'My Applied Applications'} />
      <div className="flex flex-row gap-4 flex-wrap py-4">
        {applications.map((application) => (
          <Card key={application._id} className="w-fit min-w-[360px]">
            <CardHeader className="py-0">
              <div className='flex flex-row justify-between items-center text-center'>
                <CardTitle>{application.jobInfo.jobTitle}</CardTitle>
                <p className={`font-semibold ${getStatusColor(application.jobInfo.status).colorClass}`}>
                  {getStatusColor(application.jobInfo.status).displayStatus}
                </p>
              </div>
              <CardDescription>
                {user?.role === ROLES.EMPLOYER
                  ? `Applicant: ${application.jobSeekerInfo.name}`
                  : `Employer: ${application.employerInfo.name}`}
              </CardDescription>
            </CardHeader>
            <CardContent className={`flex flex-col gap-2 py-0 pt-6`}>
              <Button variant="outline" className="w-full" onClick={() => setSelectedApplication(application)}>
                <EyeIcon className="mr-2 h-4 w-4" /> View Details
              </Button>
              {user?.role === ROLES.JOB_SEEKER && (
                <Button variant="destructive" className="w-full" onClick={() => openDeleteConfirmation(application._id)}>
                  <Trash2 className="mr-2 h-4 w-4" /> Delete Application
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      {applications.length === 0 && <p className="text-center text-destructive mt-8">No applications found.</p>}
      <ApplicationDetailsDialog
        application={selectedApplication}
        isOpen={!!selectedApplication}
        onClose={() => setSelectedApplication(null)}
        userRole={user?.role}
      />
      <AlertDialog
        open={deleteConfirmation.isOpen}
        onOpenChange={(isOpen: boolean) => setDeleteConfirmation({ ...deleteConfirmation, isOpen })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this application?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the application.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="bg-zinc-500 hover:bg-zinc-500 hover:text-zinc-50 text-zinc-50"
              onClick={() => setDeleteConfirmation({ isOpen: false, applicationId: null })}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive"
              onClick={() => deleteConfirmation.applicationId && handleDeleteApplication(deleteConfirmation.applicationId)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
