import { VercelRequest, VercelResponse } from '@vercel/node';
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  if (req.method === 'POST') {
    const { message } = req.body;

    let reply: string;
    // this simulates the beginning of the conversation
    if (message.toLowerCase().includes('hello')) {
      reply = 'Hi there! How can I assist you today?';
    } else {
      reply = "I'm not sure how to respond to that. Can you try rephrasing?";
    }

    return res.status(200).json({ reply });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
