'use server';

import { surgeryPrompt, symptomPrompt } from '@/lib/prompt/symptomPrompt';
import { chatWithAI } from '../symptoms/openai/chatWithAI';
import type { outputType } from '../symptoms/types';

const aiModel = 'gpt-5-nano';

export async function postOpenAI(url: string, body: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPEN AI API 키가 없습니다.');

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(`https://api.openai.com/v1/${url}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body,
      signal: controller.signal,
    });

    return response;
  } catch (e) {
    if ((e as Error).name === 'AbortError') {
      throw new Error('AI 응답 시간이 초과되었습니다.');
    }
    throw e;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function postSymptomForm(formData: FormData) {
  const type = formData.get('type');
  const prompt = type === 'SYMPTOM' ? symptomPrompt : surgeryPrompt;
  const description = formData.get('description') as string;

  if (!description || !description.trim())
    throw new Error('필요한 값이 없습니다');

  const images = formData.getAll('images') as File[];
  let imagesToBase64: {
    type: 'input_image';
    image_url: string;
    detail: 'auto';
  }[] = [];

  imagesToBase64 = await Promise.all(
    images
      .filter((image) => image && image.size > 0)
      .map(async (image: File) => {
        const buffer = Buffer.from(await image.arrayBuffer());
        const base64 = buffer.toString('base64');
        return {
          type: 'input_image',
          image_url: `data:${image.type};base64,${base64}`,
          detail: 'auto',
        };
      }),
  );
  let aiOutput: string | null = null;
  aiOutput = await chatWithAI(aiModel, prompt, description, imagesToBase64);
  let fromCached = false;
  if (aiOutput) {
    fromCached = true;
    return { fromCached, response: aiOutput };
  }
  const body = JSON.stringify({
    model: aiModel,
    input: [
      { role: 'system', content: [{ type: 'input_text', text: prompt }] },
      {
        role: 'user',
        content: [
          {
            type: 'input_text',
            text: description,
          },
          ...imagesToBase64,
        ],
      },
    ],
  });

  const response = await postOpenAI('responses', body);
  const answer = await response.json();
  const output = answer?.output[1]?.content[0]?.text;
  if (!output || !response.ok)
    throw new Error('AI 분석 처리 중 오류가 발생했습니다.');
  console.log(output);

  return { fromCached, response: output };
}

export async function getTTS(description: string) {
  if (!description || !description.trim())
    throw new Error('필요한 값이 없습니다.');
  const body = JSON.stringify({
    model: 'gpt-4o-mini-tts',
    voice: 'alloy',
    input: description,
  });
  const response = await postOpenAI('audio/speech', body);
  if (!response.ok) throw new Error('AI 분석 처리 중 오류가 발생했습니다.');

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer).toString('base64');
}

export async function parseOutput(output: string) {
  let result: outputType;
  try {
    result = JSON.parse(output);
  } catch {
    throw new Error('AI 분석 처리 중 오류가 발생했습니다.');
  }
  return result;
}
