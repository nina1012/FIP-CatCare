import { CareReminder, CareReminderKind, CareReminderStatus } from '../types';

import { addDays, formatReminderDate, todayKey } from './dates';

export const CARE_REMINDER_META: Record<
  CareReminderKind,
  { label: string; intervalDays: number; cadence: string }
> = {
  weigh_in: {
    label: 'Weigh-in',
    intervalDays: 7,
    cadence: 'every week',
  },
  bloodwork: {
    label: 'Bloodwork',
    intervalDays: 28,
    cadence: 'every 4 weeks',
  },
  vet_visit: {
    label: 'Vet visit',
    intervalDays: 28,
    cadence: 'every 4 weeks',
  },
};

export const STATUS_LABEL: Record<CareReminderStatus, string> = {
  overdue: 'Overdue',
  due: 'Due today',
  upcoming: 'Upcoming',
  done: 'Done',
};

export const suggestedDueOn = ({
  kind,
  today = todayKey(),
}: {
  kind: CareReminderKind;
  today?: string;
}): string =>
  addDays({
    dateKey: today,
    days: CARE_REMINDER_META[kind].intervalDays,
  });

export const nextDueOn = ({
  dueOn,
  kind,
  today = todayKey(),
}: {
  dueOn: string;
  kind: CareReminderKind;
  today?: string;
}): string => {
  const cadenceDate = addDays({
    dateKey: dueOn,
    days: CARE_REMINDER_META[kind].intervalDays,
  });
  if (cadenceDate > today) return cadenceDate;
  return suggestedDueOn({ kind, today });
};

export const careReminderStatus = ({
  reminder,
  today = todayKey(),
}: {
  reminder: Pick<CareReminder, 'due_on' | 'completed_at'>;
  today?: string;
}): CareReminderStatus => {
  if (reminder.completed_at) return 'done';
  if (reminder.due_on < today) return 'overdue';
  if (reminder.due_on === today) return 'due';
  return 'upcoming';
};

export const needsNotification = ({
  reminder,
  today = todayKey(),
}: {
  reminder: Pick<CareReminder, 'due_on' | 'completed_at' | 'last_notified_on'>;
  today?: string;
}): boolean =>
  !reminder.completed_at &&
  reminder.due_on <= today &&
  reminder.last_notified_on !== today;

export const careReminderNotification = ({
  reminder,
  today = todayKey(),
}: {
  reminder: Pick<CareReminder, 'kind' | 'due_on' | 'cat_name'>;
  today?: string;
}): { title: string; message: string } => {
  const label = CARE_REMINDER_META[reminder.kind].label;
  const cat = reminder.cat_name?.trim() || 'Your cat';
  const when = formatReminderDate(reminder.due_on);

  if (reminder.due_on < today) {
    return {
      title: `${label} overdue`,
      message: `${cat}'s ${label.toLowerCase()} was due ${when}.`,
    };
  }

  return {
    title: `${label} today`,
    message: `${cat} has a ${label.toLowerCase()} scheduled for today.`,
  };
};

export const sortCareReminders = (reminders: CareReminder[]): CareReminder[] =>
  [...reminders].sort((left, right) => {
    const leftDone = left.completed_at ? 1 : 0;
    const rightDone = right.completed_at ? 1 : 0;
    if (leftDone !== rightDone) {
      return leftDone - rightDone;
    }
    if (leftDone) {
      return (right.completed_at ?? '').localeCompare(left.completed_at ?? '');
    }
    return left.due_on.localeCompare(right.due_on);
  });
