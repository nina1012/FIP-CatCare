import { InvalidateQueryFilters, useMutation } from '@tanstack/react-query';

import { useUser } from '@/features/auth/api/get-auth-user';
import { queryClient } from '@/lib/react-query';
import { supabase } from '@/lib/supabase';
import { isFileList } from '@/utils/isFileList';
import { uploadImage } from '@/utils/upload-image';

import { User } from '../types';

type updateUserDataProps = {
  userID: string;
  updatedData: Pick<User, 'avatar_url' | 'email' | 'full_name'>;
};

export const updateUserFn = async ({
  userID,
  updatedData,
}: updateUserDataProps): Promise<User | null> => {
  if (!userID || !updatedData) return null;

  let newData: Partial<User> = {};
  let avatarFile, avatarURL;

  // if user updated their avatar image
  if (updatedData.avatar_url?.length && isFileList(updatedData.avatar_url)) {
    avatarFile = updatedData.avatar_url?.item(0); // grabs the first item from FileList
    if (avatarFile) {
      const fileType = avatarFile.type.split('/').at(1);
      const avatarImageName = `avatar_url${Date.now()}.${fileType}`;
      avatarURL = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/user_images/${avatarImageName}`;

      // uploading image to bucket
      await uploadImage({
        image: avatarFile,
        imageName: avatarImageName,
        bucketName: 'user_images',
      });
    }
  }

  newData = {
    avatar_url: avatarURL,
    full_name: updatedData.full_name,
  };

  const { data, error } = await supabase
    .from('users')
    .update({ ...newData })
    .eq('user_id', userID)
    .select();

  if (error) throw new Error(error.message);
  return data[0];
};

export const useUpdateUserData = () => {
  const { user } = useUser();
  const {
    mutate: updateUser,
    isPending: isPendingUpdateUser,
    error: errorUpdateUser,
  } = useMutation({
    mutationFn: (updatedData: User) =>
      updateUserFn({ updatedData: updatedData, userID: user?.id as string }),

    onSettled: () => {
      queryClient.invalidateQueries([
        'user',
        user?.id as string,
      ] as InvalidateQueryFilters);
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return { updateUser, isPendingUpdateUser, errorUpdateUser };
};
