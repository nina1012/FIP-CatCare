// import { useNavigate, useSearchParams } from 'react-router-dom';

import { AuthLayout } from '@/components/layouts/auth-layout';

export const LoginRoute = () => {
  //   const navigate = useNavigate();
  //   const [searchParams] = useSearchParams();

  //   const redirectTo = searchParams.get('redirectTo');
  return (
    <AuthLayout title="Login">
      <div>Login Form goes here</div>
    </AuthLayout>
  );
};
