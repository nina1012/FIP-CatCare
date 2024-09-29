import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/lib/supabase';

import { Bloodwork } from '../types';

export const getBloodworksFn = async (
  catID: string,
): Promise<Bloodwork[] | null> => {
  const { data, error } = await supabase
    .from('bloodwork')
    .select()
    .eq('cat_id', catID);
  if (error) throw new Error(error.message);
  return data;
};

export const useBloodworks = (catID: string) => {
  const {
    data: bloodworks,
    isLoading: isLoadingBloodworks,
    error: bloodworksError,
  } = useQuery({
    queryKey: ['bloodworks', catID],
    queryFn: () => getBloodworksFn(catID),
  });

  return { bloodworks, isLoadingBloodworks, bloodworksError };
};
