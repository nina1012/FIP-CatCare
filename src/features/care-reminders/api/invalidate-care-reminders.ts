import { queryClient } from '@/lib/react-query';

export const invalidateCareReminders = () => {
  queryClient.invalidateQueries({ queryKey: ['care-reminders'] });
  queryClient.invalidateQueries({ queryKey: ['open-care-reminders'] });
};
