import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/lib/supabase';

import { CareReminder } from '../types';
import { sortCareReminders } from '../utils/reminders';

import {
  CareReminderRow,
  normalizeCareReminder,
} from './normalize-care-reminder';

export const getCareRemindersFn = async (
  catID: string,
): Promise<CareReminder[]> => {
  const { data, error } = await supabase
    .from('care_reminders')
    .select('*')
    .eq('cat_id', catID)
    .order('due_on', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return sortCareReminders(
    ((data ?? []) as CareReminderRow[]).map(normalizeCareReminder),
  );
};

export const useCareReminders = (catID: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['care-reminders', catID],
    queryFn: () => getCareRemindersFn(catID),
    enabled: Boolean(catID),
  });

  return {
    reminders: data ?? [],
    isLoadingReminders: isLoading,
    remindersError: error,
  };
};

export const getOpenCareRemindersFn = async (
  userID: string,
): Promise<CareReminder[]> => {
  const { data, error } = await supabase
    .from('care_reminders')
    .select('*, cats(name)')
    .eq('user_id', userID)
    .is('completed_at', null)
    .order('due_on', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return ((data ?? []) as CareReminderRow[]).map(normalizeCareReminder);
};

export const useOpenCareReminders = (userID: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['open-care-reminders', userID],
    queryFn: () => getOpenCareRemindersFn(userID),
    enabled: Boolean(userID),
    refetchInterval: 60_000, // 1 minute
  });

  return {
    reminders: data ?? [],
    isLoadingReminders: isLoading,
    remindersError: error,
  };
};
