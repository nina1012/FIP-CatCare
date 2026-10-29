import { queryClient } from '@/lib/react-query';

export const invalidateBloodwork = () => {
  queryClient.invalidateQueries({ queryKey: ['bloodwork'] });
  queryClient.invalidateQueries({ queryKey: ['all-bloodwork'] });
  queryClient.invalidateQueries({ queryKey: ['bloodwork-result'] });
};
