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
import { useToast } from '@/components/ui/toast/use-toast';

import { useDeleteBloodwork } from '../api/bloodwork-mutations';

export const DeleteBloodworkButton = ({
  bloodworkID,
}: {
  bloodworkID: string;
}) => {
  const { toast } = useToast();
  const { deleteBloodwork, isPending } = useDeleteBloodwork({
    onError: (message) => {
      toast({
        title: 'Unsuccessful',
        description: message,
        variant: 'destructive',
      });
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className="bg-white p-2"
        aria-label="Delete bloodwork"
      >
        <Trash className="text-red-500" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this bloodwork result?</AlertDialogTitle>
          <AlertDialogDescription>
            This removes the recorded values and the attached lab report.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="hover:bg-gray-200 hover:text-primary focus:bg-gray-200 focus:text-primary"
            onClick={() => deleteBloodwork(bloodworkID)}
          >
            {isPending && <Spinner size="md" />} Yes, delete it
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
