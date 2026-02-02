import { redis } from '@/lib/redisClient';
import 'dotenv/config';
import OpenAI from 'openai';
import { makeCacheKey } from './cacheKey';

export type MessageContent =
  | { type: 'input_text'; text: string }
  | { type: 'input_image'; image_url: string; detail: 'low' | 'high' | 'auto' };

export type MessageInput = {
  role: 'system' | 'user';
  content: MessageContent[];
};

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
export async function cachedOpenAI(model: string, input: MessageInput[]) {
  const cacheKey = makeCacheKey({ model, input });

  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const response = await openai.responses.create({
    model: model,
    input: input,
  });

  const output = response.output_text;

  // 캐시 저장 1시간
  await redis.set(cacheKey, JSON.stringify(output), 'EX', 60 * 60 * 10);

  return output;
}
