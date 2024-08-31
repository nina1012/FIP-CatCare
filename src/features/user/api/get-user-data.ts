import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/lib/supabase';

import { User } from '../types';

export const getUserData = async (userID: string): Promise<User | null> => {
  if (!userID) return null;
  const { data: users, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', userID);

  if (error) throw new Error(error.message);
  return users[0] as User;
};

export const useUserData = (userID: string) => {
  const {
    data: userData,
    isLoading: isLoadingUserData,
    error: userDataError,
  } = useQuery({
    queryKey: ['user', userID],
    queryFn: () => getUserData(userID),
  });

  return { userData, isLoadingUserData, userDataError };
};
