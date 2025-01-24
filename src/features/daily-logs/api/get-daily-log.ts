import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/lib/supabase';

import { DailyLog } from '../types';

export const getDailyLogFn = async (logID: string): Promise<DailyLog[]> => {
  const { data, error } = await supabase
    .from('daily_logs')
    .select('*')
    .eq('log_id', logID);

  if (error) throw new Error(error.message);

  return data;
};

export const useDailyLog = (logID: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['daily-log', logID],
    queryFn: () => getDailyLogFn(logID),
  });

  return {
    dailyLog: data || null,
    isLoading,
    error,
  };
};
