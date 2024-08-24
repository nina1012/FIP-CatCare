export type Cat = {
  cat_id: string;
  name: string;
  breed: string;
  age: string | number;
  color: string;
  cat_image_url?: FileList;
  user_id: string;
  weight: number;
  created_at: string;
};
