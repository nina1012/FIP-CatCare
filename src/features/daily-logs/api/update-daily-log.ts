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
    onMutate: async (newDailyLog) => {
      await queryClient.cancelQueries(['daily_logs'] as InvalidateQueryFilters);

      // previous cache
      const previousLogs = queryClient.getQueryData<DailyLog[]>(['daily_logs']);

      // optimistically update the cache with the most recent dataa
      queryClient.setQueryData(['daily_logs'], (logs?: DailyLog[]) => {
        console.log(newDailyLog, logs);
        return logs
          ? [
              ...logs,
              { ...newDailyLog, updated_at: new Date().toISOString() },
            ].sort(
              (a, b) =>
                new Date(a.updated_at as Date).getTime() +
                new Date(b.updated_at as Date).getTime(),
            )
          : [{ ...newDailyLog, updated_at: new Date().toISOString() }];
      });

      return { previousLogs };
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });

  return { updateDailyLog, isPending, error };
};
