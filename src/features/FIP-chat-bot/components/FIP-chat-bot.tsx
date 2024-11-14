import React, { useState } from 'react';

import { useChatCompletion } from '../api/get-chat-completion';

export const FIPChatBot = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [submittedPrompt, setSubmittedPrompt] = useState<string>('');

  const { data, isLoading, error } = useChatCompletion(submittedPrompt || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedPrompt(prompt);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask me anything..."
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Thinking...' : 'Send'}
        </button>
      </form>

      <div>
        {isLoading && <p>Loading...</p>}
        {error && <div style={{ color: 'red' }}>Error: {error.message}</div>}
        {data && (
          <div>
            <strong>Response:</strong> {data}
          </div>
        )}
      </div>
    </div>
  );
};
