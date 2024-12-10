import { ROLES } from "@/constants";
import { Application, updateApplicationStatus, fetchEmployerApplications } from "@/store/slices/application.slice";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';


interface ApplicationDetailsDialogProps {
    application: Application | null;
    isOpen: boolean;
    onClose: () => void;
    userRole: string | undefined;
  }
  
export const getStatusColor = (status: string) => {
    const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
    switch (status.toLowerCase()) {
      case 'pending':
        return { colorClass: 'bg-zinc-400 text-zinc-100 p-2 rounded-lg', displayStatus: formattedStatus };
      case 'reviewed':
        return { colorClass: 'bg-blue-400 text-blue-50 p-2 rounded-lg', displayStatus: formattedStatus };
      case 'shortlisted':
        return { colorClass: 'bg-green-400 text-green-50 p-2 rounded-lg', displayStatus: formattedStatus };
      case 'fulfilled':
        return { colorClass: 'bg-red-400 text-red-50 p-2 rounded-lg', displayStatus: formattedStatus };
      case 'selected':
        return { colorClass: 'bg-purple-400 text-purple-50 p-2 rounded-lg', displayStatus: formattedStatus };
      default:
        return { colorClass: 'bg-zinc-400 text-zinc-50 p-2 rounded-lg', displayStatus: formattedStatus };
    }
  };


const statusOrder = ['pending', 'reviewed', 'shortlisted', 'fulfilled', 'selected'] as const;
type ApplicationStatus = typeof statusOrder[number];

function getAvailableStatuses(currentStatus: ApplicationStatus): ApplicationStatus[] {
  const currentIndex = statusOrder.indexOf(currentStatus);
  return statusOrder.slice(currentIndex);
}

export function ApplicationDetailsDialog({ application, isOpen, onClose, userRole }: ApplicationDetailsDialogProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleStatusChange = async (status: ApplicationStatus) => {
    if (application) {
      await dispatch(updateApplicationStatus(application._id, status));
      dispatch(fetchEmployerApplications());
      onClose();
    }
  };

  if (!application) return null;

  const availableStatuses = getAvailableStatuses(application.jobInfo.status as ApplicationStatus);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{application.jobInfo.jobTitle}</DialogTitle>
          <DialogDescription>
            {userRole === ROLES.EMPLOYER
              ? `Applicant: ${application.jobSeekerInfo.name}`
              : `Employer: ${application.employerInfo.name}`}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Application Status</h4>
            <p className={`font-semibold w-fit ${getStatusColor(application.jobInfo.status).colorClass}`}>
              {getStatusColor(application.jobInfo.status).displayStatus}
            </p>
          </div>
          {userRole === ROLES.EMPLOYER && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Update Status</h4>
              <Select onValueChange={handleStatusChange} defaultValue={application.jobInfo.status}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  {availableStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}