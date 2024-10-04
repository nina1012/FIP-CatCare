import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/lib/supabase';

import { DailyLog } from '../types';

export const getDailyLogsFn = async (
  catID: string,
  page: number,
  rowsPerPage: number,
): Promise<{ data: DailyLog[]; totalCount: number } | null> => {
  const from = page * rowsPerPage;
  const to = from + rowsPerPage - 1;

  const { data, error, count } = await supabase
    .from('daily_logs')
    .select('*', { count: 'exact' })
    .eq('cat_id', catID)
    .range(from, to);

  if (error) throw new Error(error.message);

  return { data: data || [], totalCount: count || 0 };
};

export const useDailyLogs = (
  catID: string,
  page: number,
  rowsPerPage: number,
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['daily-logs', catID, page, rowsPerPage],
    queryFn: () => getDailyLogsFn(catID, page, rowsPerPage),
  });

  return {
    dailyLogs: data?.data || [],
    isLoadingDailyLogs: isLoading,
    dailyLogsError: error,
    totalLogsCount: data?.totalCount || 0,
  };
};
