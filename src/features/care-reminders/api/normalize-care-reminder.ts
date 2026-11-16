import { CareReminder, CareReminderKind } from '../types';
import { dateKeyFromValue } from '../utils/dates';

export type CareReminderRow = {
  reminder_id: string;
  cat_id: string;
  user_id: string;
  kind: string;
  due_on: string;
  notes: string | null;
  completed_at: string | null;
  last_notified_on: string | null;
  created_at: string;
  updated_at: string;
  cats?: { name: string } | { name: string }[] | null;
};

const isCareReminderKind = (value: string): value is CareReminderKind =>
  value === 'weigh_in' || value === 'bloodwork' || value === 'vet_visit';

const catNameFromRow = (cats: CareReminderRow['cats']): string | null => {
  if (!cats) {
    console.error('No cats found', cats);
    return null;
  }
  if (Array.isArray(cats)) {
    console.error('Multiple cats found', cats);
    return cats[0]?.name ?? null;
  }
  return cats.name ?? null;
};

export const normalizeCareReminder = (row: CareReminderRow): CareReminder => {
  if (!isCareReminderKind(row.kind)) {
    throw new Error('Unknown reminder type');
  }

  return {
    reminder_id: row.reminder_id,
    cat_id: row.cat_id,
    user_id: row.user_id,
    kind: row.kind,
    due_on: dateKeyFromValue(row.due_on),
    notes: row.notes,
    completed_at: row.completed_at,
    last_notified_on: row.last_notified_on
      ? dateKeyFromValue(row.last_notified_on)
      : null,
    created_at: row.created_at,
    updated_at: row.updated_at,
    cat_name: catNameFromRow(row.cats),
  };
};
