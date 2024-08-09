import { Label } from '@radix-ui/react-label';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/common/button';
import { Form } from '@/components/ui/form/form';
import { Input } from '@/components/ui/form/input';
import { registerInputSchema } from '@/lib/auth';

export type RegisterFormProps = {
  onSuccess: () => void;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  return (
    <div>
      <Form
        onSubmit={(values) => {
          console.log(values);
          onSuccess();
        }}
        schema={registerInputSchema}
        options={{
          shouldUnregister: true,
        }}
      >
        {({ register, formState }) => {
          return (
            <>
              <div className="flex flex-col ">
                <Label
                  htmlFor="avatar"
                  className="group relative my-4 flex size-20 cursor-pointer flex-col items-center justify-center self-center  rounded-[50%] border-2 bg-background bg-contain text-primary focus-within:bg-primary focus-within:text-white hover:bg-primary"
                >
                  <Plus className="absolute right-0 top-0 rounded-full border border-primary bg-background focus-within:text-primary group-hover:text-primary" />
                  <Input
                    type="file"
                    registration={register('avatar')}
                    className="hidden"
                    id="avatar"
                  />
                </Label>
                <Input
                  type="text"
                  placeholder="Full Name"
                  error={formState.errors['fullName']}
                  registration={register('fullName')}
                />
              </div>
              <Input
                type="email"
                placeholder="Email Address"
                error={formState.errors['email']}
                registration={register('email')}
                autoComplete="email"
              />
              <Input
                type="password"
                placeholder="Password"
                error={formState.errors['password']}
                registration={register('password')}
                autoComplete="password"
              />
              <Input
                type="password"
                placeholder="Confirm password"
                error={formState.errors['confirm']}
                registration={register('confirm')}
              />

              <Input
                type="checkbox"
                label="Consent and agreement"
                registration={register('consent')}
                className="h-4"
              />
              <div>
                <Button type="submit" className="w-full">
                  Register
                </Button>
              </div>
            </>
          );
        }}
      </Form>
      <div className="my-4 flex items-center">
        <hr className="my-4 w-1/2" />
        <span className="mx-4 inline-block">or</span>
        <hr className="my-4 w-1/2" />
      </div>
      <div className=" text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link className="text-primary underline" to="/auth/login">
          Log in
        </Link>
      </div>
    </div>
  );
};
