import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@/lib/react-query';
import { supabase } from '@/lib/supabase';

type UseLogoutOptions = {
  onSuccess: () => void;
  onError: (err: Error) => void;
};

export const logoutFn = async () => {
  const { error: logoutError } = await supabase.auth.signOut();

  if (logoutError) throw logoutError;

  return null;
};

export const useLogout = ({ onSuccess, onError }: UseLogoutOptions) => {
  const {
    mutate: logout,
    error: logoutError,
    isPending: loggingOut,
  } = useMutation({
    mutationFn: logoutFn,
    onSuccess: () => {
      queryClient.invalidateQueries();
      onSuccess();
    },
    onError: (error) => {
      onError(error);
    },
  });

  return { logout, logoutError, loggingOut };
};
