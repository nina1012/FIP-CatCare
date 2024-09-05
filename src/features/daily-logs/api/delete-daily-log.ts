import { InvalidateQueryFilters, useMutation } from '@tanstack/react-query';

import { queryClient } from '@/lib/react-query';
import { supabase } from '@/lib/supabase';

import { DailyLog } from '../types';

type deleteDailyLogProps = {
  logID: string;
};

export const deleteDailyLogFn = async ({
  logID,
}: deleteDailyLogProps): Promise<DailyLog | null> => {
  const { data, error } = await supabase
    .from('daily_logs')
    .delete()
    .eq('log_id', logID);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const useDeleteDailyLog = () => {
  const {
    mutate: deleteDailyLog,
    isPending,
    error,
  } = useMutation({
    mutationFn: (logID: string) => deleteDailyLogFn({ logID }),
    onSuccess: () => {
      queryClient.invalidateQueries('daily-logs' as InvalidateQueryFilters);
    },
  });
  return { deleteDailyLog, isPending, error };
};
