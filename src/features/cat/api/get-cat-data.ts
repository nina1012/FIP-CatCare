import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/lib/supabase';

import { Cat } from '../types';

export const getUserData = async (catID: string): Promise<Cat | null> => {
  if (!catID) return null;
  const { data: cats, error } = await supabase
    .from('cats')
    .select('*')
    .eq('cat_id', catID);

  if (error) throw new Error(error.message);
  return cats[0] as Cat;
};

export const useCatData = (catID: string) => {
  const {
    data: catData,
    isLoading: isLoadingCatData,
    error: catDataError,
  } = useQuery({
    queryKey: ['cat', catID],
    queryFn: () => getUserData(catID),
  });

  return { catData, isLoadingCatData, catDataError };
};
