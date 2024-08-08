// import { useNavigate, useSearchParams } from 'react-router-dom';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { Button } from '@/components/ui/common/button';

export const LoginRoute = () => {
  //   const navigate = useNavigate();
  //   const [searchParams] = useSearchParams();

  //   const redirectTo = searchParams.get('redirectTo');
  return (
    <AuthLayout title="Login">
      <div>Login Form goes here</div>
      <Button className="w-full hover:text-primary">Hello</Button>
    </AuthLayout>
  );
};
