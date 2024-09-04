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
  if (!newDailyLog) return null;

  const { data: lastLog, error: fetchError } = await supabase
    .from('daily_logs')
    .select('day')
    .eq('cat_id', catID)
    .order('day', { ascending: false })
    .limit(1)
    .single();

  const nextDay = lastLog ? (lastLog.day as number) + 1 : 0;

  const { data, error } = await supabase
    .from('daily_logs')
    .insert([{ ...newDailyLog, cat_id: catID, day: nextDay }]);

  if (error || fetchError) {
    throw new Error(error?.message);
  }

  return data ? data[0] : null;
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
    mutationFn: (newDailyLog: Partial<DailyLog>) =>
      createDailyLogFn({ catID: newDailyLog.cat_id as string, newDailyLog }),
    onSuccess: (data) => {
      console.log('Mutation Success:', data); // Add this for debugging
      queryClient.invalidateQueries(['cat'] as InvalidateQueryFilters);
      onSuccess?.();
    },
    onError: (error) => {
      console.error('Mutation Error:', error); // Add this for debugging
      onError?.(error);
    },
  });

  return { createDailyLog, isCreatingDailyLog, errorDailyLog };
};
