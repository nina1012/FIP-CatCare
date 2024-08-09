import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/common/button';
import { Form } from '@/components/ui/form/form';
import { Input } from '@/components/ui/form/input';
import { loginInputSchema } from '@/lib/auth';

export type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  return (
    <div>
      <Form
        data-testid="form"
        onSubmit={(values) => {
          console.log('Form submitted with values:', values);
          onSuccess();
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
              />
              <Input
                type="password"
                placeholder="Password"
                error={formState.errors['password']}
                registration={register('password')}
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
