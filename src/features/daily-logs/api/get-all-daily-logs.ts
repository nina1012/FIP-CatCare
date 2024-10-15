import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/lib/supabase';

import { DailyLog } from '../types';

export const getAllLogsFn = async (
  catID: string,
): Promise<DailyLog[] | null> => {
  const { data, error } = await supabase
    .from('daily_logs')
    .select()
    .eq('cat_id', catID);

  if (error) throw new Error(error.message);
  return data;
};

export const useAllDailyLogs = (catID: string) => {
  const {
    data: allDailyLogs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['all-daily-logs'],
    queryFn: () => getAllLogsFn(catID),
  });
  return {
    allDailyLogs,
    isLoading,
    error,
  };
};
