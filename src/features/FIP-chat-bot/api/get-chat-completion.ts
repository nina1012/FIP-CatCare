import { InvalidateQueryFilters, useMutation } from '@tanstack/react-query';

import { queryClient } from '@/lib/react-query';

export const getChatCompletion = async (prompt: string) => {
  const response = await fetch('/api/openai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error('Error fetching chat completion');
  }

  const data = await response.json();
  console.log(data.message);
  return data.message;
};

export const useChatCompletion = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: getChatCompletion,
    mutationKey: ['chat'],
    onSuccess: () => {
      queryClient.invalidateQueries(['chat'] as InvalidateQueryFilters);
    },
    onError: (error) => {
      console.error('Create Chat Completion error:', error);
    },
  });

  return { mutate, isPending, error };
};
