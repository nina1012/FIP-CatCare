// this might be expaneded in future
export const CARE_REMINDER_KINDS = [
  'weigh_in',
  'bloodwork',
  'vet_visit',
] as const;

export type CareReminderKind = (typeof CARE_REMINDER_KINDS)[number];

export type CareReminderStatus = 'overdue' | 'due' | 'upcoming' | 'done';

export type CareReminder = {
  reminder_id: string;
  cat_id: string;
  user_id: string;
  kind: (typeof CARE_REMINDER_KINDS)[number];
  due_on: string;
  notes: string | null;
  completed_at: string | null;
  last_notified_on: string | null;
  created_at: string;
  updated_at: string;
  cat_name: string | null;
};

export type CareReminderInput = {
  cat_id: string;
  kind: CareReminderKind;
  due_on: string;
  notes?: string | null;
};

export type CompleteCareReminderResult = {
  completed: CareReminder;
  next: CareReminder | null;
  nextAlreadyScheduled: boolean;
  nextError: string | null;
};
