import { useState } from 'react';

import { Badge } from '@/components/ui/common/badge';
import { Button } from '@/components/ui/common/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog/dialog';

import { CareReminder, CareReminderStatus } from '../types';
import { formatReminderDate } from '../utils/dates';
import {
  CARE_REMINDER_META,
  STATUS_LABEL,
  careReminderStatus,
} from '../utils/reminders';

import { CareReminderForm } from './care-reminder-form';
import { CompleteCareReminderButton } from './complete-care-reminder-button';
import { DeleteCareReminderButton } from './delete-care-reminder-button';

const badgeVariant: Record<
  CareReminderStatus,
  'default' | 'destructive' | 'outline' | 'secondary'
> = {
  overdue: 'destructive',
  due: 'default',
  upcoming: 'outline',
  done: 'secondary',
};

const OPEN_GROUPS: CareReminderStatus[] = ['overdue', 'due', 'upcoming'];

const CareReminderRow = ({ reminder }: { reminder: CareReminder }) => {
  const [editing, setEditing] = useState(false);
  const status = careReminderStatus({ reminder });
  const label = CARE_REMINDER_META[reminder.kind].label;
  const when = formatReminderDate(reminder.due_on);

  return (
    <li className="rounded-md border p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-semibold">{label}</p>
          <p className="text-sm">{when}</p>
          {reminder.notes && (
            <p className="mt-1 text-sm text-muted-foreground">
              {reminder.notes}
            </p>
          )}
        </div>
        <Badge variant={badgeVariant[status]}>{STATUS_LABEL[status]}</Badge>
      </div>
      {status !== 'done' && (
        <div className="mt-3 flex flex-wrap gap-2">
          <CompleteCareReminderButton reminder={reminder} />
          <Dialog open={editing} onOpenChange={setEditing}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                aria-label={`Edit ${label} on ${when}`}
              >
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent>
              {editing && (
                <CareReminderForm
                  catID={reminder.cat_id}
                  reminder={reminder}
                  onSaved={() => setEditing(false)}
                />
              )}
            </DialogContent>
          </Dialog>
          <DeleteCareReminderButton reminder={reminder} />
        </div>
      )}
    </li>
  );
};

export const CareReminderList = ({
  reminders,
}: {
  reminders: CareReminder[];
}) => {
  if (reminders.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No reminders yet. Schedule a weigh-in, bloodwork or vet visit so it is
        not missed.
      </p>
    );
  }

  const grouped = (status: CareReminderStatus) =>
    reminders.filter((reminder) => careReminderStatus({ reminder }) === status);

  const done = grouped('done');

  return (
    <div className="flex flex-col gap-6">
      {OPEN_GROUPS.map((status) => {
        const items = grouped(status);
        if (items.length === 0) return null;

        return (
          <section key={status} aria-label={STATUS_LABEL[status]}>
            <h3 className="mb-2 text-sm font-semibold">
              {STATUS_LABEL[status]}
            </h3>
            <ul className="flex flex-col gap-3">
              {items.map((reminder) => (
                <CareReminderRow
                  key={reminder.reminder_id}
                  reminder={reminder}
                />
              ))}
            </ul>
          </section>
        );
      })}
      {/* TODO: make done reminders rendered for a certain amount of time after completion so they are not deleted from the database */}
      {done.length > 0 && (
        <details className="rounded-md border p-4">
          <summary className="cursor-pointer text-sm font-semibold">
            Done ({done.length})
          </summary>
          <ul className="mt-3 flex flex-col gap-3">
            {done.map((reminder) => (
              <CareReminderRow key={reminder.reminder_id} reminder={reminder} />
            ))}
          </ul>
        </details>
      )}
    </div>
  );
};
