import { InvalidateQueryFilters, useMutation } from '@tanstack/react-query';

import { useUser } from '@/features/auth/api/get-auth-user';
import { queryClient } from '@/lib/react-query';
import { supabase } from '@/lib/supabase';
import { isFileList } from '@/utils/isFileList';
import { uploadImage } from '@/utils/upload-image';

import { Cat } from '../types';

export type useRegisterCatOptions = {
  onSuccess?: () => void;
  onError?: (error: any) => void;
};

type registerCatFnProps = {
  userID: string;
  catDetails: Omit<Cat, 'cat_id' | 'user_id' | 'created_at'>;
};

export const registerCatFn = async ({
  userID,
  catDetails,
}: registerCatFnProps): Promise<Cat | null> => {
  if (!catDetails) return null;
  // here should be handled the uploading image if provided

  let imageFile, imageURL; // these variables will keep track of reference to actual File that we should upload to bucket

  if (
    catDetails.cat_image_url?.length &&
    isFileList(catDetails.cat_image_url)
  ) {
    imageFile = catDetails.cat_image_url?.item(0); // grabs the first item from FileList
    if (imageFile) {
      // find the type of the image : .png, .gif, .jpeg ....
      const fileType = imageFile.type.split('/').at(1);
      // create image name that will be at the end of the URL in cat_images bucket
      const avatarImageName = `avatar_img_${Date.now()}.${fileType}`;
      imageURL = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/cat_images/${avatarImageName}`;

      // uploading image to bucket
      await uploadImage({
        image: imageFile,
        imageName: avatarImageName,
        bucketName: 'cat_images',
      });
    }
  }

  const { name, breed, age, color, weight } = catDetails;
  const { data, error } = await supabase.rpc('register_new_cat', {
    _user_id: userID,
    _name: name,
    _breed: breed,
    _age: parseInt(age + '', 10),
    _weight: parseInt(weight + '', 10),
    _color: color,
    _cat_image_url: imageURL || '',
  });

  if (error) throw new Error(error.message);
  return data;
};

export const useRegisterCat = ({
  onSuccess,
  onError,
}: useRegisterCatOptions) => {
  const { user } = useUser();

  const {
    mutate: registerCat,
    isPending,
    error,
  } = useMutation({
    mutationFn: (catDetails: Omit<Cat, 'cat_id' | 'user_id' | 'created_at'>) =>
      registerCatFn({ catDetails, userID: user?.id as string }),
    onSuccess: () => {
      queryClient.invalidateQueries(['cats'] as InvalidateQueryFilters);
      onSuccess?.();
    },
    onError: (error) => {
      throw new Error(error.message);
      onError?.(error);
    },
  });

  return { registerCat, isPending, error };
};
