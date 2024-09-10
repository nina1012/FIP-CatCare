import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/common/button';
import { Form } from '@/components/ui/form/form';
import { Input } from '@/components/ui/form/input';
import { useToast } from '@/components/ui/toast/use-toast';
import { loginInputSchema } from '@/lib/auth';

import { useLogin } from '../api/login';

export type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { toast } = useToast();

  const { login } = useLogin({
    onSuccess: () => {
      toast({
        title: 'Successful login',
        description: 'Welcome back to FIP CatCare app 🐈',
      });
      onSuccess();
    },
    onError: (error) => {
      toast({
        title: 'Unsuccessful login',
        description: error,
        variant: 'destructive',
      });
    },
  });
  return (
    <div>
      <Form
        data-testid="form"
        onSubmit={(values) => {
          login(values);
        }}
        schema={loginInputSchema}
        options={{
          shouldUnregister: true,
        }}
      >
        {({ register, formState }) => {
          return (
            <>
              <Input
                type="email"
                placeholder="Email Address"
                error={formState.errors['email']}
                registration={register('email')}
                data-testid="email"
              />
              <Input
                type="password"
                placeholder="Password"
                error={formState.errors['password']}
                registration={register('password')}
                data-testid="password"
              />
              <div>
                <Button type="submit" className="w-full">
                  Log in
                </Button>
              </div>
            </>
          );
        }}
      </Form>
      <div className="my-4 flex items-center text-gray-600">
        <hr className="my-4 w-1/2" />{' '}
        <span className="mx-4 inline-block">or</span>
        <hr className="my-4 w-1/2" />
      </div>
      <div className="text-center text-sm text-gray-600">
        Don&apos;t have an account yet?{' '}
        <Link className="text-primary underline" to="/auth/register">
          Sign up
        </Link>
      </div>
    </div>
  );
};
