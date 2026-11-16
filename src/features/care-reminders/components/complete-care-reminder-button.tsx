import { useState } from 'react';

import { Button } from '@/components/ui/common/button';
import { Spinner } from '@/components/ui/common/spinner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog/dialog';
import { useToast } from '@/components/ui/toast/use-toast';

import { useCompleteCareReminder } from '../api/care-reminder-mutations';
import { CareReminder } from '../types';
import { formatReminderDate } from '../utils/dates';
import { CARE_REMINDER_META, nextDueOn } from '../utils/reminders';
import {
  SAMPLE_REMINDERS_MESSAGE,
  isSampleCareReminder,
} from '../utils/sample-reminders';

export const CompleteCareReminderButton = ({
  reminder,
}: {
  reminder: CareReminder;
}) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [scheduleNext, setScheduleNext] = useState(true);
  const label = CARE_REMINDER_META[reminder.kind].label;
  const nextDate = nextDueOn({ dueOn: reminder.due_on, kind: reminder.kind });
  const when = formatReminderDate(reminder.due_on);

  const { completeCareReminder, isPending } = useCompleteCareReminder({
    onSuccess: (result) => {
      let description = 'Marked as done.';
      if (result.next) {
        description = `Next ${label.toLowerCase()} scheduled for ${formatReminderDate(result.next.due_on)}.`;
      } else if (result.nextAlreadyScheduled) {
        description = 'Marked as done. The next one is already scheduled.';
      } else if (result.nextError) {
        description = `Marked as done. ${result.nextError}`;
      }
      toast({ title: 'Reminder done', description });
      setOpen(false);
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
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (nextOpen) setScheduleNext(true);
      }}
    >
      <DialogTrigger asChild>
        <Button size="sm" aria-label={`Mark ${label} on ${when} done`}>
          Mark done
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Mark this {label.toLowerCase()} done?</DialogTitle>
        <DialogDescription>
          {label} due {when}.
        </DialogDescription>
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            className="mt-1"
            checked={scheduleNext}
            onChange={(event) => setScheduleNext(event.target.checked)}
          />
          <span>
            Schedule the next {label.toLowerCase()} for{' '}
            {formatReminderDate(nextDate)}
          </span>
        </label>
        <Button
          disabled={isPending}
          onClick={() => {
            if (isSampleCareReminder(reminder.reminder_id)) {
              toast({
                title: 'Sample reminder',
                description: SAMPLE_REMINDERS_MESSAGE,
              });
              setOpen(false);
              return;
            }
            completeCareReminder({ reminder, scheduleNext });
          }}
        >
          {isPending && <Spinner size="sm" className="mr-2 bg-white" />}
          Confirm
        </Button>
      </DialogContent>
    </Dialog>
  );
};
