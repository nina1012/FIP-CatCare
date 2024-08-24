import { supabase } from '@/lib/supabase';

type uploadImageProps = {
  image: File;
  imageName: string;
  bucketName: string;
};

export const uploadImage = async ({
  image,
  imageName,
  bucketName,
}: uploadImageProps) => {
  if (!image) return;
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(imageName, image, {
      contentType: image?.type,
    });

  if (error) throw new Error(error.message);

  return data;
};

type deleteImageProps = {
  imageURL: string;
  bucketName: string;
};

export const deleteImage = async ({
  imageURL,
  bucketName,
}: deleteImageProps) => {
  const imageName = imageURL.split(`/${bucketName}/`)[1];

  const { data, error } = await supabase.storage
    .from(bucketName)
    .remove([imageName]);
  if (error) throw new Error(error.message);
  console.log('deleting image....', data, imageName);
  return data;
};
