import { CareReminder } from '../types';

import { addDays, todayKey } from './dates';

// TODO: THESE SAMPLE REMINDERS WILL BE REMOVED AFTER THE FEATURE IS RELEASE DAND THE NEW DATABASE IS PUSHED AND DEPLOYED
export const SAMPLE_REMINDERS_MESSAGE =
  'These are sample reminders so you can see the layout. They are not saved.';

export const isSampleCareReminder = (reminderID: string) =>
  reminderID.startsWith('sample-');

export const remindersTableMissing = (error: unknown) =>
  error instanceof Error && /does not exist|schema cache/i.test(error.message);

export const sampleCareReminders = ({
  cat_id,
  user_id,
  name,
}: {
  cat_id: string;
  user_id: string;
  name: string;
}): CareReminder[] => {
  const today = todayKey();
  const stamp = new Date().toISOString();
  const base = {
    cat_id,
    user_id,
    cat_name: name,
    last_notified_on: null,
    created_at: stamp,
    updated_at: stamp,
  };

  return [
    {
      ...base,
      reminder_id: `sample-weigh-${cat_id}`,
      kind: 'weigh_in',
      due_on: addDays({ dateKey: today, days: -3 }),
      notes: 'Kitchen scale, before breakfast',
      completed_at: null,
    },
    {
      ...base,
      reminder_id: `sample-blood-${cat_id}`,
      kind: 'bloodwork',
      due_on: today,
      notes: 'Recheck the albumin/globulin ratio, hematocrit, and bilirubin',
      completed_at: null,
    },
    {
      ...base,
      reminder_id: `sample-vet-${cat_id}`,
      kind: 'vet_visit',
      due_on: addDays({ dateKey: today, days: 12 }),
      notes: 'County clinic at 10:30',
      completed_at: null,
    },
    {
      ...base,
      reminder_id: `sample-done-${cat_id}`,
      kind: 'weigh_in',
      due_on: addDays({ dateKey: today, days: -10 }),
      notes: null,
      completed_at: stamp,
    },
  ];
};
