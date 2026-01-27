import crypto from 'crypto';
import type { MessageInput } from './cachedAIResult';

export function makeCacheKey(payload: {
  model: string;
  input: MessageInput[];
}) {
  const normalized = {
    model: payload.model,
    input: payload.input ?? null,
  };

  const json = JSON.stringify(normalized);
  const hash = crypto.createHash('sha256').update(json).digest('hex');

  return `openai:cache:v1:${hash}`;
}
