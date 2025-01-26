import { Plus } from 'lucide-react';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '@/components/ui/common/button';
import { Spinner } from '@/components/ui/common/spinner';
import { Form, Input, Label } from '@/components/ui/form';
import { loginInputSchema } from '@/lib/auth';
// import { isFileList } from '@/utils/isFileList';

import { useUpdateUserData } from '../api/update-user-data';
import { User } from '../types';

type UpdateUserFormProps = {
  userData: Pick<User, 'avatar_url' | 'email' | 'full_name'>;
};

const updateUserSchema = loginInputSchema.extend({
  avatar_url: z.instanceof(FileList).optional().or(z.string()),
  full_name: z.string(),
  email: z.string(),
});
const UpdateUserForm = ({ userData }: UpdateUserFormProps) => {
  const { updateUser, isPendingUpdateUser, errorUpdateUser } =
    useUpdateUserData();

  if (!userData) return null;

  return (
    <div className="mb-12">
      <Form
        onSubmit={(values) => {
          let avatarUrl;

          // If no file selected, use the existing avatar URL
          if (values.avatar_url && values.avatar_url.length === 0) {
            avatarUrl = userData?.avatar_url;
          }

          // Ensure transformed data is passed
          const updatedData = {
            ...values,
            avatar_url: avatarUrl || values.avatar_url,
          };

          updateUser(updatedData);
        }}
        schema={updateUserSchema}
      >
        {({ register, formState, watch }) => {
          const selectedFile = watch('avatar_url');
          const isFileSelected = selectedFile && selectedFile.length > 0;

          return (
            <>
              <Label
                htmlFor="avatarUrl"
                className="group relative mx-auto my-4 flex size-20 cursor-pointer flex-col items-center justify-center self-center rounded-[50%] border-2"
              >
                <Plus className="absolute right-0 top-0 z-10 rounded-full border border-primary bg-background text-primary transition-all focus-within:text-white group-hover:bg-primary group-hover:text-white" />
                <Input
                  type="file"
                  registration={register('avatar_url')}
                  className="hidden"
                  id="avatarUrl"
                />
                <div className="border-2">
                  <img
                    src={
                      isFileSelected && selectedFile?.[0] instanceof File
                        ? URL.createObjectURL(selectedFile[0])
                        : (userData.avatar_url as string)
                    }
                    alt="Preview"
                    className="absolute inset-0 z-0 size-full rounded-full object-cover object-center"
                  />
                </div>
              </Label>
              <Input
                type="email"
                placeholder="Email"
                registration={register('email')}
                error={formState.errors['email']}
                defaultValue={userData.email as string}
              />
              <Input
                type="text"
                placeholder="Full Name"
                error={formState.errors['full_name']}
                registration={register('full_name')}
                defaultValue={userData.full_name as string}
              />

              {errorUpdateUser && (
                <div className="text-sm text-red-500">
                  {errorUpdateUser.message}
                </div>
              )}

              <div className="flex justify-center gap-4">
                <Link to="/app/dashboard">
                  <Button variant="outline">Cancel</Button>
                </Link>

                <Button type="submit">
                  Edit {userData.full_name}{' '}
                  {isPendingUpdateUser && <Spinner size="sm" />}
                </Button>
              </div>
            </>
          );
        }}
      </Form>
    </div>
  );
};

export default memo(UpdateUserForm);
