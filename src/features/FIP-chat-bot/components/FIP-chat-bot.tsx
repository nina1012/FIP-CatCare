import clsx from 'clsx';
import { Cat } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/common/button';

import { useChatCompletion } from '../api/get-chat-completion';

export const FIPChatBot = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { mutate, isPending, error } = useChatCompletion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate(prompt);
  };

  const toggleIsOpen = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col-reverse">
      <Button onClick={toggleIsOpen} className="justify-self-end">
        <Cat />
      </Button>
      <div className={clsx(isOpen ? 'block' : 'hidden')}>
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask me anything..."
          />
          <button type="submit" disabled={isPending}>
            {isPending ? 'Thinking...' : 'Send'}
          </button>
        </form>

        <div className={clsx(error || isPending ? 'block' : 'hidden')}>
          {isPending && <p>Loading...</p>}
          {error && <div style={{ color: 'red' }}>Error: {error.message}</div>}
        </div>
      </div>
    </div>
  );
};
