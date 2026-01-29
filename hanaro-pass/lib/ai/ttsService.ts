import { postOpenAI } from './openaiClient';

export async function generateTTS(text: string) {
  if (!text?.trim()) throw new Error('필요한 값이 없습니다.');

  const body = JSON.stringify({
    model: 'gpt-4o-mini-tts',
    voice: 'alloy',
    input: text,
  });

  const response = await postOpenAI('audio/speech', body);
  if (!response.ok) throw new Error('TTS 생성 실패');

  const buffer = await response.arrayBuffer();
  return Buffer.from(buffer).toString('base64');
}
