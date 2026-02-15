import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * 한국어 → 영어 (의료 톤)
 * 서버 전용
 */
export async function translateKoToEn(text: string): Promise<string> {
  if (!text) return '';

  try {
    const res = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a professional medical translator.',
        },
        {
          role: 'user',
          content: `Translate the following Korean medical text into natural English:\n\n${text}`,
        },
      ],
      temperature: 0.2,
    });

    return res.choices[0].message?.content?.trim() ?? text;
  } catch {
    return text;
  }
}
