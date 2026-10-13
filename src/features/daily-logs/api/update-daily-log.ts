import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@/lib/react-query';
import { supabase } from '@/lib/supabase';

import { DailyLog } from '../types';

type updateDailyLogFnProps = {
  logID: string;
  updatedDailyLog: Partial<DailyLog>;
};

type UseUpdateDailyLogOptions = {
  onSuccess?: () => void;
  onError?: (error: string) => void;
};

export const updateDailyLogFn = async ({
  logID,
  updatedDailyLog,
}: updateDailyLogFnProps): Promise<DailyLog | null> => {
  const { dose, weight, medication_name, note } = updatedDailyLog;

  const { data, error } = await supabase
    .from('daily_logs')
    .update({ dose, weight, medication_name, note })
    .eq('log_id', logID);

  if (error) throw new Error(error.message);
  return data;
};

export const useUpdateDailyLog = (
  logID: string,
  { onSuccess, onError }: UseUpdateDailyLogOptions = {},
) => {
  const {
    mutate: updateDailyLog,
    isPending,
    error,
  } = useMutation({
    mutationFn: (updateData: Partial<DailyLog>) =>
      updateDailyLogFn({ updatedDailyLog: updateData, logID }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['daily-logs'] });
      queryClient.invalidateQueries({ queryKey: ['all-daily-logs'] });
      queryClient.invalidateQueries({ queryKey: ['daily-log', logID] });
      onSuccess?.();
    },
    onError: (mutationError) => {
      const message =
        mutationError instanceof Error
          ? mutationError.message
          : 'Could not update the daily log.';
      onError?.(message);
    },
  });

  return { updateDailyLog, isPending, error };
};
