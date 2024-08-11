import { AuthError, AuthResponse } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@/lib/react-query';

type UseLoginOptions = {
  onSuccess?: (data: AuthResponse['data']) => void;
  onError?: (error: AuthError['message']) => void;
};

export const loginFn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<AuthResponse['data']> => {
  console.log('loginFn gets called');
  return {
    user: {
      id: '123',
      email,
      password,
    } as any,
    session: {
      access_token: 'mock_access_token',
      refresh_token: 'mock_refresh_token',
    } as any,
  };
};

export const useLogin = ({ onSuccess, onError }: UseLoginOptions = {}) => {
  const { mutate: login, isPending } = useMutation({
    mutationFn: loginFn,
    mutationKey: ['auth-user'],
    onSuccess: (data) => {
      queryClient.setQueryData(['auth-user'], { ...data });
      return onSuccess?.(data);
    },
    onError: (error) => onError?.(error?.message),
  });
  return { login, isPending };
};
