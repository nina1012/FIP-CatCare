import { Link } from 'react-router-dom';

import { Badge } from '@/components/ui/common/badge';
import { Spinner } from '@/components/ui/common/spinner';
import { Cat } from '@/features/cat/types';

import { useOpenCareReminders } from '../api/get-care-reminders';
import { CareReminderStatus } from '../types';
import { formatReminderDate } from '../utils/dates';
import {
  CARE_REMINDER_META,
  STATUS_LABEL,
  careReminderStatus,
} from '../utils/reminders';
import {
  SAMPLE_REMINDERS_MESSAGE,
  remindersTableMissing,
  sampleCareReminders,
} from '../utils/sample-reminders';

const badgeVariant: Record<
  CareReminderStatus,
  'default' | 'destructive' | 'outline' | 'secondary'
> = {
  overdue: 'destructive',
  due: 'default',
  upcoming: 'outline',
  done: 'secondary',
};

export const UpcomingCareReminders = ({
  userID,
  cats,
}: {
  userID: string;
  cats: Cat[];
}) => {
  const { reminders, isLoadingReminders, remindersError } =
    useOpenCareReminders(userID);
  const showSamples = remindersTableMissing(remindersError);
  const previewCat = cats[0];
  const visibleReminders =
    showSamples && previewCat
      ? sampleCareReminders(previewCat).filter(
          (reminder) => !reminder.completed_at,
        )
      : reminders;

  const overdueCount = visibleReminders.filter(
    (reminder) => careReminderStatus({ reminder }) === 'overdue',
  ).length;

  return (
    <section className="my-8" aria-label="Care reminders">
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <h2 className="text-lg font-bold">Reminders</h2>
        {overdueCount > 0 && (
          <Badge variant="destructive">{overdueCount} overdue</Badge>
        )}
      </div>
      {isLoadingReminders && <Spinner size="sm" />}
      {showSamples && (
        <p className="mb-3 max-w-3xl rounded-sm border border-[#dfb028] bg-[#dfb028]/40 p-2 text-xs">
          {SAMPLE_REMINDERS_MESSAGE}
        </p>
      )}
      {remindersError && !showSamples && (
        <p role="alert" className="text-sm text-red-500">
          Could not load reminders.{' '}
          {remindersError instanceof Error ? remindersError.message : ''}
        </p>
      )}
      {!isLoadingReminders &&
        !showSamples &&
        !remindersError &&
        visibleReminders.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No weigh-ins, bloodwork, or vet visits scheduled. Open a cat to add
            one.
          </p>
        )}
      {visibleReminders.length > 0 && (
        <ul className="flex max-w-3xl flex-col gap-3">
          {visibleReminders.map((reminder) => {
            const status = careReminderStatus({ reminder });
            const label = CARE_REMINDER_META[reminder.kind].label;
            const catName = reminder.cat_name || 'Cat';

            return (
              <li key={reminder.reminder_id}>
                <Link
                  to={`/app/cat/${reminder.cat_id}`}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-md border p-4 shadow-sm"
                >
                  <span>
                    <span className="block font-semibold">
                      {catName} · {label}
                    </span>
                    <span className="text-sm">
                      {formatReminderDate(reminder.due_on)}
                    </span>
                  </span>
                  <Badge variant={badgeVariant[status]}>
                    {STATUS_LABEL[status]}
                  </Badge>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};
