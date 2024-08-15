import { AuthResponse } from '@supabase/supabase-js';

export const mockLoginFn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<AuthResponse['data']> => {
  if (email && password) {
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
  }
  throw new Error('Invalid credentials');
};

export const mockUseLogin = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: AuthResponse['data']) => void;
  onError?: (error: string) => void;
}) => {
  const login = async (data: { email: string; password: string }) => {
    try {
      const result = await mockLoginFn(data);
      console.log(result);
      onSuccess?.(result);
    } catch (error: unknown) {
      onError?.(error as string);
    }
  };
  return { login, isPending: false };
};
