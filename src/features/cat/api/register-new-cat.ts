import { InvalidateQueryFilters, useMutation } from '@tanstack/react-query';

import { useUser } from '@/features/auth/api/get-auth-user';
import { queryClient } from '@/lib/react-query';
import { supabase } from '@/lib/supabase';

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
  //
  //

  const { name, breed, age, color, weight, image_url } = catDetails;
  const { data, error } = await supabase.rpc('register_new_cat', {
    _user_id: userID,
    _name: name,
    _breed: breed,
    _age: parseInt(age + '', 10),
    _weight: parseInt(weight + '', 10),
    _color: color,
    _image_url: image_url,
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
