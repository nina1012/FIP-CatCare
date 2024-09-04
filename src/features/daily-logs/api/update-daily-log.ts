import { InvalidateQueryFilters, useMutation } from '@tanstack/react-query';

import { queryClient } from '@/lib/react-query';
import { supabase } from '@/lib/supabase';

import { DailyLog } from '../types';

type updateDailyLogFnProps = {
  logID: string;
  updatedDailyLog: Partial<DailyLog>;
};

export const updateDailyLogFn = async ({
  logID,
  updatedDailyLog,
}: updateDailyLogFnProps): Promise<DailyLog | null> => {
  if (!updatedDailyLog) return null;

  //   fetch log from the given date and only then update, because there is a restriction for creating new logs
  const { data, error } = await supabase
    .from('daily_logs')
    .update({ ...updatedDailyLog })
    .eq('log_id', logID);

  if (error) throw new Error(error.message);
  return data;
};

export const useUpdateDailyLog = (logID: string) => {
  const {
    mutate: updateDailyLog,
    isPending,
    error,
  } = useMutation({
    mutationFn: (updateData: Partial<DailyLog>) =>
      updateDailyLogFn({ updatedDailyLog: updateData, logID }),
    onSettled: (data) => {
      console.log(data);
      queryClient.invalidateQueries([
        'daily-logs',
        logID,
      ] as InvalidateQueryFilters);
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });

  return { updateDailyLog, isPending, error };
};
