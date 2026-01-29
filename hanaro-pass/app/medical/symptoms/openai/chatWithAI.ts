import { cachedOpenAI, type MessageInput } from './cachedAIResult';

export async function chatWithAI(
  model: string,
  prompt: string,
  description: string,
  images: { type: 'input_image'; image_url: string; detail: 'auto' }[],
) {
  const messages: MessageInput[] = [
    { role: 'system', content: [{ type: 'input_text', text: prompt }] },
    {
      role: 'user',
      content: [{ type: 'input_text', text: description }, ...images],
    },
  ];
  const aiOutput = await cachedOpenAI(model, messages);

  return aiOutput;
}
