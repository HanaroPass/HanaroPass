import hashText from '../../utils/hash';
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
  const hash = hashText(json);

  return `openai:cache:v1:${hash}`;
}
