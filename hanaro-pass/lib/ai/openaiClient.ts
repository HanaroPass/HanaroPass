const aiModel = 'gpt-5-nano';

export async function postOpenAI(url: string, body: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPEN AI API 키가 없습니다.');

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    return await fetch(`https://api.openai.com/v1/${url}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body,
      signal: controller.signal,
    });
  } catch (e) {
    if ((e as Error).name === 'AbortError') {
      throw new Error('AI 응답 시간이 초과되었습니다.');
    }
    throw e;
  } finally {
    clearTimeout(timeoutId);
  }
}

export { aiModel };
