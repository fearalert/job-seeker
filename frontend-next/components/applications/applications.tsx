'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Briefcase, ClipboardCheck, Eye, EyeIcon, Trash2, User2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { fetchEmployerApplications, fetchJobSeekerApplications, deleteApplication, updateApplicationStatus, Application } from '@/store/slices/application.slice';
import { AppDispatch, RootState } from '@/store/store';
import { ROLES } from '@/constants';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import AuthHeader from '@/components/navbar/AuthenticatedHeader';
import LoadingView from '@/app/loading';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { getStatusColor, ApplicationDetailsDialog } from './DetailsDialog';


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
      <div className="py-4 px-8">
      {applications.length > 0 ? (
        <Table className="w-full rounded-sm overflow-x-auto">
          <TableHeader className="bg-primary hover:bg-primary">
            <TableRow>
              <TableHead className="text-primary-foreground font-semibold">
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-4 w-4" />
                  <span>Job Title</span>
                </div>
              </TableHead>
              <TableHead className="text-primary-foreground font-semibold">
                <div className="flex items-center space-x-2">
                  <User2 className="h-4 w-4" />
                  <span>{user?.role === ROLES.EMPLOYER ? 'Applicant' : 'Employer'}</span>
                </div>
              </TableHead>
              <TableHead className="text-primary-foreground font-semibold">
                <div className="flex items-center space-x-2">
                  <ClipboardCheck className="h-4 w-4" />
                  <span>Status</span>
                </div>
              </TableHead>
              <TableHead className="text-primary-foreground font-semibold text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((application, index) => (
              <TableRow key={application._id} className={index % 2 === 0 ? 'bg-muted/50' : 'bg-background'}>
                <TableCell className='text-sm text-zinc-500 flex flex-col justify-start items-start gap-2'>
                  <div className='font-bold text-md text-zinc-800'>
                    {application.jobInfo.jobTitle}
                  </div>
                  <span className='text-zinc-600'>
                    {application._id}
                  </span>
                  </TableCell>
                <TableCell>
                      {user?.role === ROLES.EMPLOYER
                        ? application.jobSeekerInfo.name
                        : application.employerInfo.name}                 
                </TableCell>
                <TableCell className="text-start">
                  <span
                    className={`font-semibold ${getStatusColor(application.jobInfo.status).colorClass}`}
                  >
                    {getStatusColor(application.jobInfo.status).displayStatus}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedApplication(application)}
                    >
                      <Eye className="mr-1 h-4 w-4" /> View
                    </Button>
                    {user?.role === ROLES.JOB_SEEKER && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => openDeleteConfirmation(application._id)}
                      >
                        <Trash2 className="mr-1 h-4 w-4" /> Delete
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-destructive mt-8">No applications found.</p>
      )}
    </div>
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

