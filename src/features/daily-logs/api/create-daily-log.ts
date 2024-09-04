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

  const { data, error } = await supabase
    .from('daily_logs')
    .insert([{ cat_id: catID, ...newDailyLog }]);

  if (error) {
    console.error('Supabase Error:', error);
    throw new Error(error.message);
  }

  console.log('Supabase Data:', data);
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
