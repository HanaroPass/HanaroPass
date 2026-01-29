'use server';

import { parseAIOutput } from '@/lib/ai/outputParser';
import { analyzeSymptom } from '@/lib/ai/symptomService';
import { generateTTS } from '@/lib/ai/ttsService';

export async function postSymptomForm(formData: FormData) {
  const type = formData.get('type') as string;
  const description = formData.get('description') as string;
  const images = formData.getAll('images') as File[];
  console.log(images);
  return analyzeSymptom(type, description, images);
}

export async function getTTS(description: string) {
  return generateTTS(description);
}

export async function parseOutput(output: string) {
  return parseAIOutput(output);
}