import { Bell } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/common/button';
import { Spinner } from '@/components/ui/common/spinner';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog/dialog';
import { useCatData } from '@/features/cat/api/get-cat-data';

import { useCareReminders } from '../api/get-care-reminders';
import {
  SAMPLE_REMINDERS_MESSAGE,
  remindersTableMissing,
  sampleCareReminders,
} from '../utils/sample-reminders';

import { CareReminderForm } from './care-reminder-form';
import { CareReminderList } from './care-reminder-list';

export const CareRemindersTab = ({ catID }: { catID: string }) => {
  const [open, setOpen] = useState(false);
  const { reminders, isLoadingReminders, remindersError } =
    useCareReminders(catID);
  const { catData } = useCatData(catID);
  const showSamples = remindersTableMissing(remindersError);
  const visibleReminders =
    showSamples && catData ? sampleCareReminders(catData) : reminders;

  return (
    <div className="my-4 flex flex-col gap-4">
      <p className="rounded-sm border border-[#1f8caf] bg-[#1f8caf]/10 p-2 text-xs">
        {`These dates are saved for ${catData?.name}. A daily dose time in the browser
        does not cover weigh-ins, bloodwork or vet visits.`}
      </p>
      {showSamples && (
        <p className="rounded-sm border border-[#dfb028] bg-[#dfb028]/40 p-2 text-xs">
          {SAMPLE_REMINDERS_MESSAGE}
        </p>
      )}
      <div className="max-w-sm">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Bell className="mr-2 size-4" />
              New reminder
            </Button>
          </DialogTrigger>
          <DialogContent>
            {open && (
              // open reminder form
              <CareReminderForm catID={catID} onSaved={() => setOpen(false)} />
            )}
          </DialogContent>
        </Dialog>
      </div>
      {isLoadingReminders && <Spinner />}
      {remindersError && !showSamples && (
        <p role="alert" className="text-sm text-red-500">
          Could not load reminders.{' '}
          {remindersError instanceof Error ? remindersError.message : ''}
        </p>
      )}
      {!isLoadingReminders && (!remindersError || showSamples) && (
        <CareReminderList reminders={visibleReminders} />
      )}
    </div>
  );
};
