export type Cat = {
  cat_id: string;
  name: string;
  breed: string;
  age: string | number;
  color: string;
  cat_image_url?: FileList | string;
  user_id: string;
  weight: number;
  created_at: string;
  sex?: 'male' | 'female' | 'neutered male' | 'spayed female';
};
