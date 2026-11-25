import { supabase } from '@/lib/supabase';

import { CareReminder } from '../types';
import { todayKey } from '../utils/dates';
import {
  careReminderNotification,
  needsNotification,
} from '../utils/reminders';

const claimNotification = async ({
  reminder,
  today,
}: {
  reminder: CareReminder;
  today: string;
}) => {
  const { data, error } = await supabase
    .from('care_reminders')
    .update({
      last_notified_on: today,
      updated_at: new Date().toISOString(),
    })
    .eq('reminder_id', reminder.reminder_id)
    .is('completed_at', null)
    .or(`last_notified_on.is.null,last_notified_on.lt.${today}`)
    .select('reminder_id')
    .maybeSingle();

  if (error) throw new Error(error.message);
  return Boolean(data);
};

const releaseNotification = async (reminder: CareReminder): Promise<void> => {
  await supabase
    .from('care_reminders')
    .update({
      last_notified_on: reminder.last_notified_on,
      updated_at: new Date().toISOString(),
    })
    .eq('reminder_id', reminder.reminder_id);
};

export const notifyDueReminder = async (
  reminder: CareReminder,
): Promise<boolean> => {
  const today = todayKey();
  if (!needsNotification({ reminder, today })) {
    return false;
  }

  const claimed = await claimNotification({ reminder, today });
  if (!claimed) {
    return false;
  }

  const { title, message } = careReminderNotification({ reminder, today });
  const { error } = await supabase.rpc('add_notification', {
    message,
    title,
    user_id: reminder.user_id,
  });

  if (error) {
    await releaseNotification(reminder);
    throw new Error(error.message);
  }

  if (
    typeof Notification !== 'undefined' &&
    Notification.permission === 'granted'
  ) {
    new Notification(title, {
      body: message,
      icon: '/cat-medication.png',
    });
  }

  return true;
};
