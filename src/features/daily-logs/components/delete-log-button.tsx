import { Trash } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog/alert-dialog';
import { Spinner } from '@/components/ui/common/spinner';

import { useDeleteDailyLog } from '../api/delete-daily-log';

export const DeleteLogButton = ({ logID }: { logID: string }) => {
  const { deleteDailyLog, isPending } = useDeleteDailyLog();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this daily log?')) {
      deleteDailyLog(logID);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-white p-2">
        <Trash className="text-red-500" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            daily log and remove data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="hover:bg-gray-200 hover:text-primary focus:bg-gray-200 focus:text-primary "
            onClick={handleDelete}
          >
            {isPending && <Spinner size="md" />} Yes, I&apos;m sure
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
