import { supabase } from '@/lib/supabase';

export const sendDailyReminder = async () => {
  const { data, error } = await supabase.rpc('add_notification', {
    message: "Don't miss today's dosage!!!",
    title: 'Potential missed dosage 💉',
    user_id:
      localStorage.getItem('sb-localhost-auth-token') &&
      JSON.parse(localStorage.getItem('sb-localhost-auth-token') || '')['user'][
        'id'
      ],
  });
  console.log(data, error);
  if (Notification.permission === 'granted') {
    new Notification('Daily Treatment Reminder', {
      body: "Don't forget to log your cat's daily treatment! It's best for your cat to be given a medication at the same time daily if possible",
      icon: '/cat-medication.png',
    });
  }
};
