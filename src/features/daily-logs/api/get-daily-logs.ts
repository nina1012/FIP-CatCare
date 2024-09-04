import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/lib/supabase';

import { DailyLog } from '../types';

export const getDailyLogs = async (
  catID: string,
): Promise<DailyLog[] | null> => {
  const { data, error } = await supabase
    .from('daily_logs')
    .select()
    .eq('cat_id', catID);
  if (error) throw new Error(error.message);
  return data;
};

export const useDailyLogs = (catID: string) => {
  const {
    data: dailyLogs,
    isLoading: isLoadingDailyLogs,
    error: dailyLogsError,
  } = useQuery({
    queryKey: ['daily-logs', catID],
    queryFn: () => getDailyLogs(catID),
  });

  return { dailyLogs, isLoadingDailyLogs, dailyLogsError };
};
