'use client'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { EyeIcon, Loader2, Trash2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { fetchEmployerApplications, fetchJobSeekerApplications, deleteApplication, Application } from '@/store/slices/application.slice'
import { AppDispatch, RootState } from '@/store/store'
import { ROLES } from '@/constants'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import AuthHeader from '@/components/navbar/AuthenticatedHeader'

interface ApplicationDetailsDialogProps {
  application: Application | null
  isOpen: boolean
  onClose: () => void
  userRole: string | undefined
}

function ApplicationDetailsDialog({ application, isOpen, onClose, userRole }: ApplicationDetailsDialogProps) {
  if (!application) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{application.jobInfo.jobTitle}</DialogTitle>
          <DialogDescription>
            {userRole === ROLES.EMPLOYER
              ? `Applicant: ${application.jobSeekerInfo.name}`
              : `Employer: ${application.employerInfo.name}`}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {userRole === ROLES.EMPLOYER && (
            <>
              <div className='text-zinc-500'>
                <h4 className="font-semibold text-zinc-800">Applicant Details</h4>
                <p>Name: {application.jobSeekerInfo.name}</p>
                <p>Email: {application.jobSeekerInfo.email}</p>
                <p>Phone: {application.jobSeekerInfo.phone}</p>
                <p>Address: {application.jobSeekerInfo.address}</p>
              </div>
            </>
          )}
          <div className='text-zinc-500'>
            <h4 className="font-semibold text-zinc-800">Job Details</h4>
            <p>Job ID: {application.jobInfo.jobId}</p>
            <p>Organization: {application.employerInfo.name}</p>
            <br />
            <div className='text-zinc-500'>
                <h4 className="font-semibold text-zinc-800">Cover Letter</h4>
                <p>{application.jobSeekerInfo.coverLetter}</p>
            </div>
            <br />
            <div className='text-zinc-500'>
                <h4 className="font-semibold text-zinc-800">Resume</h4>
              <Button variant='outline' onClick={() => window.open(application.jobSeekerInfo.resume.url, '_blank')}>
                View Resume
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function ApplicationsPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { applications, loading, error, message } = useSelector((state: RootState) => state.application)
  const { user } = useSelector((state: RootState) => state.user)
  const { toast } = useToast()
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; applicationId: string | null }>({
    isOpen: false,
    applicationId: null,
  })

  useEffect(() => {
    if (user?.role === ROLES.EMPLOYER) {
      dispatch(fetchEmployerApplications())
    } else if (user?.role === ROLES.JOB_SEEKER) {
      dispatch(fetchJobSeekerApplications())
    }
  }, [dispatch, user?.role])

  useEffect(() => {
    if (message) {
      toast({
        title: "Success",
        description: message,
      })
    }
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      })
    }
  }, [message, error, toast])

  const handleDeleteApplication = async (id: string) => {
    await dispatch(deleteApplication(id))
    if (user?.role === ROLES.EMPLOYER) {
      dispatch(fetchEmployerApplications())
    } else if (user?.role === ROLES.JOB_SEEKER) {
      dispatch(fetchJobSeekerApplications())
    }
    setDeleteConfirmation({ isOpen: false, applicationId: null })
  }

  const openDeleteConfirmation = (id: string) => {
    setDeleteConfirmation({ isOpen: true, applicationId: id })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className='w-full'>
      <AuthHeader title={user?.role === ROLES.EMPLOYER ? 'Applied Applications' : 'My Applied Applications'}/>
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4 px-4 py-4">
        {applications.map((application) => (
          <Card key={application._id}>
            <CardHeader className='pb-0'>
              <CardTitle>{application.jobInfo.jobTitle}</CardTitle>
              <CardDescription>
                {user?.role === ROLES.EMPLOYER 
                  ? `Applicant: ${application.jobSeekerInfo.name}`
                  : `Employer: ${application.employerInfo.name}`}
              </CardDescription>
            </CardHeader>
            <CardContent className='flex flex-row items-center text-center justify-center gap-2'>
              <Button variant="outline" className="w-full" onClick={() => setSelectedApplication(application)}>
                <EyeIcon className="mr-2 h-4 w-4" /> View Details
              </Button>
              <Button variant="destructive" className="w-full" onClick={() => openDeleteConfirmation(application._id)}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete Application
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      {applications.length === 0 && (
        <p className="text-center text-destructive mt-8">No applications found.</p>
      )}
      <ApplicationDetailsDialog
        application={selectedApplication}
        isOpen={!!selectedApplication}
        onClose={() => setSelectedApplication(null)}
        userRole={user?.role}
      />
      <AlertDialog open={deleteConfirmation.isOpen} onOpenChange={(isOpen: boolean) => setDeleteConfirmation({ ...deleteConfirmation, isOpen })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this application?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the application.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteConfirmation({ isOpen: false, applicationId: null })}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteConfirmation.applicationId && handleDeleteApplication(deleteConfirmation.applicationId)}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

