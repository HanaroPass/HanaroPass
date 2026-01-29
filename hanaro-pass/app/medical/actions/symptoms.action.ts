'use server';

import { redis } from '@/app/redis/client';
import { parseAIOutput } from '@/lib/ai/outputParser';
import { analyzeSymptom } from '@/lib/ai/symptomService';
import { generateTTS } from '@/lib/ai/ttsService';
import hashText from '../utils/hash';

export async function postSymptomForm(formData: FormData) {
  const type = formData.get('type') as string;
  const description = formData.get('description') as string;
  const images = formData.getAll('images') as File[];
  console.log(images);
  return analyzeSymptom(type, description, images);
}

export async function getTTS(description: string) {
  const hash = hashText(description);
  const key = `tts:ko:${hash}`;
  const cached = await redis.get(key);
  if (cached) return cached;

  const audio = await generateTTS(description);
  await redis.set(key, audio, 'EX', 604800);
  return audio;
}

export async function parseOutput(output: string) {
  return parseAIOutput(output);
}
