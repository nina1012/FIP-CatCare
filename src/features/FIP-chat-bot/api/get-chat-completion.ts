import { useQuery } from '@tanstack/react-query';

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
  return data.message;
};

export const useChatCompletion = (prompt: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['chat', prompt],
    queryFn: () => getChatCompletion(prompt),
  });

  return { data, isLoading, error };
};
