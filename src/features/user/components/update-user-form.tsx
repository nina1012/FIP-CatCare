import { Plus } from 'lucide-react';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '@/components/ui/common/button';
import { Spinner } from '@/components/ui/common/spinner';
import { Form, Input, Label } from '@/components/ui/form';
import { loginInputSchema } from '@/lib/auth';
import { isFileList } from '@/utils/isFileList';

import { useUpdateUserData } from '../api/update-user-data';
import { User } from '../types';

type UpdateUserFormProps = {
  userData: Pick<User, 'avatar_url' | 'email' | 'full_name'>;
};

const updateUserSchema = loginInputSchema.extend({
  avatar_url: z.instanceof(FileList).optional().or(z.string()),
  full_name: z.string().optional(),
  email: z.string(),
});
const UpdateCatForm = ({ userData }: UpdateUserFormProps) => {
  const { updateUser, isPendingUpdateUser } = useUpdateUserData();

  if (!userData) return;
  return (
    <div>
      <Form
        onSubmit={(values) => {
          console.log(values);
          let imageUrl;
          // if user didn't update info, keep the old cat_image_url
          if (values.avatar_url && values.avatar_url.length === 0) {
            imageUrl = userData?.avatar_url;
          }
          updateUser({
            avatar_url: values.avatar_url ? values.avatar_url : imageUrl,
            full_name: values.full_name ? values.full_name : userData.full_name,
            email: userData.email,
          });
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
                className="group relative mx-auto my-4 flex size-20 cursor-pointer flex-col items-center justify-center self-center rounded-[50%]  border-2"
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
                      isFileSelected && isFileList(selectedFile[0])
                        ? selectedFile[0] + ''
                        : (userData.avatar_url as string)
                    }
                    alt="Preview"
                    className="absolute inset-0 z-0 size-full rounded-full object-cover object-center"
                  />
                </div>
              </Label>
              <Input
                type="email"
                placeholder={userData.email as string}
                registration={register('email')}
                // disabled
                error={formState.errors['email']}
                value={userData.email as string}
              />
              <Input
                type="text"
                placeholder={userData.full_name as string}
                error={formState.errors['full_name']}
                registration={register('full_name')}
                defaultValue={userData.full_name as string}
              />

              <div className="flex justify-center gap-4">
                <Link to="/app/dashboard">
                  <Button variant="outline">Cancel</Button>
                </Link>

                <Button type="submit">
                  Edit {userData.full_name}{' '}
                  <span className="inline-block">
                    {isPendingUpdateUser && <Spinner size="sm" />}
                  </span>
                </Button>
              </div>
            </>
          );
        }}
      </Form>
    </div>
  );
};

export default memo(UpdateCatForm);
