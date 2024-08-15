import { AuthResponse } from '@supabase/supabase-js';

export const mockRegisterFn = async ({
  email,
  password,
  fullName,
}: {
  email: string;
  password: string;
  fullName: string;
}): Promise<AuthResponse['data']> => {
  if (email && password && fullName) {
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
  }
  throw new Error('Fill all the fields');
};

export const mockUseRegister = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: AuthResponse['data']) => void;
  onError?: (error: string) => void;
}) => {
  const register = async (data: {
    email: string;
    password: string;
    fullName: string;
  }) => {
    try {
      const result = await mockRegisterFn(data);
      console.log(result);
      onSuccess?.(result);
    } catch (error: unknown) {
      onError?.(error as string);
    }
  };
  return { register, isPending: false };
};
