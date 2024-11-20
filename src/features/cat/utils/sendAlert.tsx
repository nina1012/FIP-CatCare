import { supabase } from '@/lib/supabase';

export const sendAlert = async () => {
  const { data, error } = await supabase.rpc('add_notification', {
    message: 'Your cat has lost weight in the past 7 days!',
    title: 'Weight loss alert 𐄷',
    user_id:
      localStorage.getItem('sb-localhost-auth-token') &&
      JSON.parse(localStorage.getItem('sb-localhost-auth-token') || '')['user'][
        'id'
      ],
  });
  console.log(data, error);
};
