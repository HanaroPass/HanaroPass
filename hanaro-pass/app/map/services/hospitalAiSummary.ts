'use server';

import { postOpenAI } from '@/app/medical/actions/symptoms';

type SummaryInput = {
  reviews: string[];
};

export async function getHospitalAiSummary(input: SummaryInput) {
  if (!input.reviews.length) return '';

  const prompt = `
다음은 한 병원에 대한 여러 이용자 후기입니다.
이 후기들을 종합해서 외국인에게 도움이 될
병원 특징을 한 문장으로 요약해 주세요.

조건:
- 반드시 후기 내용에 근거할 것
- 1문장
- 과장 ❌, 광고 느낌 ❌
- 친절하고 중립적인 톤
- 한국어
- 장점 위주이되 단점이 있으면 완곡하게 표현
- "후기들을 종합하면" 같은 말은 쓰지 말 것
- "이 병원은" 같은 말로 시작하지 말 것

후기 목록:
${input.reviews.map((r) => `- ${r}`).join('\n')}
`;

  const body = JSON.stringify({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: '너는 병원 리뷰를 요약하는 AI야.' },
      { role: 'user', content: prompt },
    ],
    temperature: 0.5,
    max_tokens: 60,
  });

  try {
    const response = await postOpenAI('chat/completions', body);
    const json = await response.json();

    return json?.choices?.[0]?.message?.content?.trim() ?? '';
  } catch (e) {
    console.error('병원 요약 실패:', e);
    return '';
  }
}
