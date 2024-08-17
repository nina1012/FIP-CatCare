import { AuthResponse, AuthError } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@/lib/react-query';
import { supabase } from '@/lib/supabase';

import { mockRegisterFn } from './mocks/register.mock';

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
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  const { data: users, error: insertionError } = await supabase
    .from('users')
    .insert({ fullName });
  console.log(users);

  if (insertionError) {
    throw insertionError;
  }

  if (error) {
    throw error;
  }

  return data;
};

export const useRegister = ({
  onSuccess,
  onError,
}: UseRegisterOptions = {}) => {
  const mutationFn = import.meta.env.DEV ? registerFn : mockRegisterFn; // TODO, before building, change to PROD

  const { mutate: registering, isPending } = useMutation({
    mutationFn,
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
