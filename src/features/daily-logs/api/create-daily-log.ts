import { InvalidateQueryFilters, useMutation } from '@tanstack/react-query';

import { queryClient } from '@/lib/react-query';
import { supabase } from '@/lib/supabase';

import { DailyLog } from '../types';

export type useCreateDailyLog = {
  onSuccess?: () => void;
  onError?: (error: any) => void;
};

type createDailyLogProps = {
  catID: string;
  newDailyLog: Partial<DailyLog>;
};

export const createDailyLogFn = async ({
  catID,
  newDailyLog,
}: createDailyLogProps): Promise<DailyLog | null> => {
  // Get the start and end of the day in local timezone
  const startOfDay = new Date().setHours(0, 0, 0, 0);
  const endOfDay = new Date().setHours(23, 59, 59, 999);

  // Check if a log already exists for the current day
  const { data: existingLog, error: fetchError } = await supabase
    .from('daily_logs')
    .select('*')
    .eq('cat_id', catID)
    .gte('log_date', new Date(startOfDay).toISOString())
    .lte('log_date', new Date(endOfDay).toISOString());

  if (fetchError) {
    throw new Error(fetchError.message);
  }

  if (existingLog && existingLog.length > 0) {
    throw new Error('A daily log for today already exists.');
  }

  // Proceed with the insertion if no log exists for today
  const { data, error } = await supabase
    .from('daily_logs')
    .insert({ ...newDailyLog, cat_id: catID });

  if (error) throw new Error(error.message);
  return data && data[0];
};

export const useCreateDailyLog = ({
  onSuccess,
  onError,
}: useCreateDailyLog) => {
  const {
    mutate: createDailyLog,
    isPending: isCreatingDailyLog,
    error: errorDailyLog,
  } = useMutation({
    mutationFn: (newDailyLog: Partial<DailyLog>) => {
      if (!newDailyLog.cat_id) {
        throw new Error('cat_id is required');
      }
      return createDailyLogFn({
        catID: newDailyLog.cat_id as string,
        newDailyLog,
      });
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries([
        'cat',
        variables.cat_id,
      ] as InvalidateQueryFilters);
      onSuccess?.();
    },
    onError: (error) => {
      console.error('Create Daily Log Error:', error);
      onError?.(error);
    },
  });

  return { createDailyLog, isCreatingDailyLog, errorDailyLog };
};
