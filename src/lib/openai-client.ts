import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  baseURL: 'https://api.openai.com/v1/chat/completions',
  dangerouslyAllowBrowser: true,
});
console.log(openai);
export default openai;
