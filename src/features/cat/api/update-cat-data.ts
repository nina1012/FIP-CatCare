import { InvalidateQueryFilters, useMutation } from '@tanstack/react-query';

import { queryClient } from '@/lib/react-query';
import { supabase } from '@/lib/supabase';
import { isFileList } from '@/utils/isFileList';
import { uploadImage } from '@/utils/upload-image';

import { Cat } from '../types';

type UpdatedCat = Omit<Cat, 'created_at' | 'user_id' | 'cat_id'>;

type editCatDataProps = {
  catID: string;
  updatedData: UpdatedCat;
};

export const updateCatFn = async ({
  catID,
  updatedData,
}: editCatDataProps): Promise<Cat | null> => {
  if (!catID || !updatedData) return null;

  let newData: Partial<Cat> = {};
  let cat_image_url, imageFile;

  // if user updated their avatar image
  if (
    updatedData.cat_image_url?.length &&
    isFileList(updatedData.cat_image_url)
  ) {
    imageFile = updatedData.cat_image_url?.item(0); // grabs the first item from FileList
    if (imageFile) {
      // find the type of the image : .png, .gif, .jpeg ....
      const fileType = imageFile.type.split('/').at(1);
      // create image name that will be at the end of the URL in cat_images bucket
      const catImageName = `cat_img_${Date.now()}.${fileType}`;
      cat_image_url = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/cat_images/${catImageName}`;

      // uploading image to bucket
      await uploadImage({
        image: imageFile,
        imageName: catImageName,
        bucketName: 'cat_images',
      });
    }
  }

  newData = {
    ...updatedData,
    cat_image_url: cat_image_url,
  };
  console.log(newData);
  const { data, error } = await supabase
    .from('cats')
    .update({ ...newData })
    .eq('cat_id', catID)
    .select();

  if (error) throw new Error(error.message);
  return data[0];
};

export const useUpdateCatData = (catID: string) => {
  const {
    mutate: updateCat,
    isPending: isPendingUpdateCat,
    error: errorUpdateCat,
  } = useMutation({
    mutationFn: (updatedData: UpdatedCat) =>
      updateCatFn({ updatedData: updatedData, catID }),

    onSettled: (data) => {
      console.log(data);
      queryClient.invalidateQueries(['cat', catID] as InvalidateQueryFilters);
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return { updateCat, isPendingUpdateCat, errorUpdateCat };
};
