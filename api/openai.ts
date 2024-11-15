import { VercelRequest, VercelResponse } from '@vercel/node';

import { openai } from '../src/lib/openai-client';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const completion = await openai.completions.create({
      prompt: prompt,
      model: 'gpt-3.5-turbo',
      max_tokens: 100,
    });

    console.log('OpenAI completion:', completion);

    if (!completion) {
      return res.status(500).json({ error: 'No response from OpenAI' });
    }
    return res.status(200).json({ message: completion });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Error fetching chat completion' });
  }
}

const completion = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: 'write a haiku about ai' }],
});
console.log(completion);
