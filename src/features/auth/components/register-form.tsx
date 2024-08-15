import { Label } from '@radix-ui/react-label';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/common/button';
import { Form } from '@/components/ui/form/form';
import { Input } from '@/components/ui/form/input';
import { useToast } from '@/components/ui/toast/use-toast';
import { registerInputSchema } from '@/lib/auth';

import { useRegister } from '../api/register';

export type RegisterFormProps = {
  onSuccess: () => void;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const { toast } = useToast();

  const { registering } = useRegister({
    onSuccess: () => {
      toast({
        title: 'Successful registration',
        description: 'You have successfully registered to FIP CatCare app 🐈',
      });
      onSuccess();
    },
  });

  return (
    <div>
      <Form
        onSubmit={(values) => {
          console.log(values, 'register gets called');
          registering(values);
        }}
        schema={registerInputSchema}
        options={{
          shouldUnregister: true,
        }}
      >
        {({ register, formState, watch }) => {
          // setting preview avatar if user has selected their avatar image
          const selectedFile = watch('avatar');
          const isFileSelected = selectedFile && selectedFile.length > 0;

          return (
            <>
              <div className="flex flex-col ">
                <Label
                  htmlFor="avatar"
                  className="group relative my-4 flex size-20 cursor-pointer flex-col items-center justify-center self-center rounded-[50%]  border-2"
                >
                  <Plus className="absolute right-0 top-0 z-10 rounded-full border border-primary bg-background text-primary transition-all focus-within:text-white group-hover:bg-primary group-hover:text-white" />
                  <Input
                    type="file"
                    registration={register('avatar')}
                    className="hidden"
                    id="avatar"
                  />
                  <div className="">
                    <img
                      src={
                        isFileSelected
                          ? URL.createObjectURL(selectedFile[0])
                          : '/avatar-placeholder.png'
                      }
                      alt="Preview"
                      className="absolute inset-0 z-0 size-full rounded-full  object-cover object-center"
                    />
                  </div>
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

              <div className="!mt-8 flex items-start gap-2 space-x-2 pl-2 *:w-auto">
                <Input
                  type="checkbox"
                  registration={register('consent')}
                  className="h-4 *:w-auto"
                  id="consent"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="consent"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Consent and agreement
                  </label>
                  <p className="text-sm text-muted-foreground">
                    You agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
              <div className="!mt-8">
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
