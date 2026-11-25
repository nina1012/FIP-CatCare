import { useEffect, useRef } from 'react';

import { useUser } from '@/features/auth/api/get-auth-user';

import { useOpenCareReminders } from '../api/get-care-reminders';
import { invalidateCareReminders } from '../api/invalidate-care-reminders';
import { notifyDueReminder } from '../api/notify-due-reminders';
import { needsNotification } from '../utils/reminders';

export const CareReminderWatcher = () => {
  const { user } = useUser();
  const { reminders } = useOpenCareReminders(user?.id as string);
  const inFlight = useRef(false);

  useEffect(() => {
    const due = reminders.filter((reminder) => needsNotification({ reminder }));
    if (due.length === 0 || inFlight.current) return;

    inFlight.current = true;
    Promise.all(
      due.map(async (reminder) => {
        try {
          return await notifyDueReminder(reminder);
        } catch (error) {
          console.error(error);
          return false;
        }
      }),
    )
      .then((results) => {
        if (results.some(Boolean)) invalidateCareReminders();
      })
      .finally(() => {
        inFlight.current = false;
      });
  }, [reminders]);

  return null;
};
