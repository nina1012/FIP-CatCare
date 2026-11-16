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

import { useDeleteCareReminder } from '../api/care-reminder-mutations';
import { CareReminder } from '../types';
import { formatReminderDate } from '../utils/dates';
import { CARE_REMINDER_META } from '../utils/reminders';
import {
  SAMPLE_REMINDERS_MESSAGE,
  isSampleCareReminder,
} from '../utils/sample-reminders';

export const DeleteCareReminderButton = ({
  reminder,
}: {
  reminder: CareReminder;
}) => {
  const { toast } = useToast();
  const label = CARE_REMINDER_META[reminder.kind].label;
  const when = formatReminderDate(reminder.due_on);
  const { deleteCareReminder, isPending } = useDeleteCareReminder({
    onSuccess: () => {
      toast({
        title: 'Reminder deleted',
        description: `${label} on ${when} was removed.`,
      });
    },
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
        className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium text-red-500"
        aria-label={`Delete ${label} on ${when}`}
      >
        <Trash className="size-4" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete this {label.toLowerCase()}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            {label} on {when} will be removed for this cat.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="hover:bg-gray-200 hover:text-primary focus:bg-gray-200 focus:text-primary"
            onClick={() => {
              if (isSampleCareReminder(reminder.reminder_id)) {
                toast({
                  title: 'Sample reminder',
                  description: SAMPLE_REMINDERS_MESSAGE,
                });
                return;
              }
              deleteCareReminder(reminder.reminder_id);
            }}
          >
            {isPending && <Spinner size="md" />} Yes, delete it
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
