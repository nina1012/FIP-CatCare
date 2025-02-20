export type User = {
  user_id: string;
  full_name: string | null;
  avatar_url?: FileList | string | null;
  email: string | null;
  created_at: string;
  updated_at: string;
};
