import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/lib/supabase';

import { Cat } from '../types';

export const getCats = async (userID: string): Promise<Cat[] | null> => {
  if (!userID) return null;
  const { data: cats, error } = await supabase
    .from('cats')
    .select('*')
    .eq('user_id', userID);

  if (error) throw new Error(error.message);
  return cats;
};

export const useCats = (userID: string) => {
  const {
    data: cats,
    isLoading: isLoadingCats,
    error,
  } = useQuery({
    queryKey: ['cats', userID],
    queryFn: () => getCats(userID),
  });

  return { cats, isLoadingCats, error };
};
