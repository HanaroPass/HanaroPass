import { chatWithAI } from '@/app/medical/symptoms/openai/chatWithAI';
import { encodeImagesToOpenAIFormat } from './imageEncoder';
import { aiModel, postOpenAI } from './openaiClient';
import { surgeryPrompt, symptomPrompt } from './symptomPrompt';

export async function analyzeSymptom(
  type: string,
  description: string,
  images: File[],
) {
  if (!description?.trim()) throw new Error('필요한 값이 없습니다.');

  const prompt = type === 'SYMPTOM' ? symptomPrompt : surgeryPrompt;
  const encodedImages = await encodeImagesToOpenAIFormat(images);

  const cached = await chatWithAI(aiModel, prompt, description, encodedImages);
  if (cached) {
    return { fromCached: true, response: cached };
  }

  const body = JSON.stringify({
    model: aiModel,
    input: [
      { role: 'system', content: [{ type: 'input_text', text: prompt }] },
      {
        role: 'user',
        content: [{ type: 'input_text', text: description }, ...encodedImages],
      },
    ],
  });

  const response = await postOpenAI('responses', body);
  const answer = await response.json();
  const output = answer?.output[1]?.content[0]?.text;

  if (!output || !response.ok)
    throw new Error('AI 분석 처리 중 오류가 발생했습니다.');

  return { fromCached: false, response: output };
}
