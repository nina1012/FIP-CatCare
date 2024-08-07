// import { useNavigate, useSearchParams } from 'react-router-dom';

import { AuthLayout } from '@/components/layouts/auth-layout';

export const RegisterRoute = () => {
  //   const navigate = useNavigate();
  //   const [searchParams] = useSearchParams();

  //   const redirectTo = searchParams.get('redirectTo');
  return (
    <AuthLayout title="Welcome back">
      <div>Register Form goes here</div>
    </AuthLayout>
  );
};
