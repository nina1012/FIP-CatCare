import { AuthResponse, AuthError } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@/lib/react-query';
import { supabase } from '@/lib/supabase';

// import { mockRegisterFn } from './mocks/register.mock';

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
    .insert({ full_name: fullName, email, user_id: data?.user?.id });
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
  // testing the msw!!!
  // const mutationFn = import.meta.env.PROD ? registerFn : mockRegisterFn;
  const { mutate: registering, isPending } = useMutation({
    mutationFn: registerFn,
    mutationKey: ['auth-user'],
    onSuccess: (data) => {
      queryClient.setQueryData(['auth-user'], {
        ...data,
      });
      return onSuccess?.(data);
    },
    onError: (error) => onError?.(error?.message),
  });
  return { registering, isPending };
};
