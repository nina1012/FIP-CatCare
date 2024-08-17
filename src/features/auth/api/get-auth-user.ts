import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/lib/supabase';

export const getAuthUser = async () => {
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) throw sessionError;
  if (!session.session) return null;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw error;
  if (!user) return null;

  return user;
};

export const useUser = () => {
  const {
    data: user,
    isLoading: isLoadingUser,
    error: userError,
    fetchStatus,
  } = useQuery({
    queryKey: ['auth-user'],
    queryFn: getAuthUser,
  });

  const isAuthenticated = user?.role === 'authenticated';

  return {
    user,
    isLoadingUser,
    userError,
    fetchStatus,
    isAuthenticated,
  };
};
