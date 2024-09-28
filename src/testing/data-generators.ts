import { randUserName, randEmail, randUuid } from '@ngneat/falso';

import { Cat } from '@/features/cat/types';

export const generateCat = (): Cat => ({
  cat_id: '0c38ccd9-90e1-4a01-82e6-95284ceb4f60',
  name: 'Whiskers ',
  breed: 'American Shorthair',
  age: 2,
  color: 'White',
  weight: 3,
  sex: 'neutered male',
  cat_image_url:
    'http://localhost:54321/storage/v1/object/public/cat_images/cat_img_1726345603186.jpeg',
  user_id: 'b8ce393b-d124-49ac-a423-bfc6c56b1e54',
  created_at: '2024-09-14T19:58:49.44785+00:00',
});

export const generateUser = () => ({
  full_name: randUserName(),
  avatar_url:
    'https://hhlssisemnabnytofbci.supabase.co/storage/v1/object/public/user_images/avatar-placeholder.png',
  created_at: '2024-09-14T11:34:51.456353+00:00',
  updated_at: '2024-09-14T11:34:51.456353+00:00',
  email: randEmail(),
  user_id: randUuid(),
  password: 'password123',
});
