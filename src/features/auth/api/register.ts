import { AuthResponse, AuthError } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@/lib/react-query';

type UseRegisterOptions = {
  onSuccess?: (user: AuthResponse['data']) => void;
  onError?: (error: AuthError['message']) => void;
};

export const registerFn = async ({
  email,
  password,
  fullName,
}: {
  email: string;
  password: string;
  fullName: string;
}): Promise<AuthResponse['data']> => {
  console.log('registerFn gets called');
  return {
    user: {
      id: '123',
      email,
      password,
      fullName,
    } as any,
    session: {
      access_token: 'mock_access_token',
      refresh_token: 'mock_refresh_token',
    } as any,
  };
};

export const useRegister = ({
  onSuccess,
  onError,
}: UseRegisterOptions = {}) => {
  const { mutate: registering, isPending } = useMutation({
    mutationFn: registerFn,
    mutationKey: ['auth-user'],
    onSuccess: (data) => {
      queryClient.setQueryData(['auth-user'], {
        ...data,
      });
      console.log(data);
      return onSuccess?.(data);
    },
    onError: (error) => onError?.(error?.message),
  });
  return { registering, isPending };
};
