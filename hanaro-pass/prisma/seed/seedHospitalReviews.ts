import OpenAI from 'openai';
import {
  pickRandomPlasticReviews,
  pickRandomReviews,
} from '@/app/medical/symptoms/openai/hospitalsReview';
import { prisma } from '@/lib/prisma';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateSummary(reviews: string[]): Promise<string> {
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
${reviews.map((r) => `- ${r}`).join('\n')}
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3,
  });

  return response.choices[0].message?.content?.trim() || '';
}

export async function seedHospitalReviews() {
  console.log('[ AI 병원 요약 - DB Seed 시작... ]');

  // DB에서 모든 병원 가져오기
  const hospitals = await prisma.hospital.findMany({
    include: {
      HospitalDept: {
        select: {
          deptName: true,
        },
      },
    },
  });

  for (const hospital of hospitals) {
    let reviews: string[];
    if (hospital.HospitalDept.some((d) => d.deptName === '성형외과')) {
      reviews = pickRandomPlasticReviews();
    } else reviews = pickRandomReviews();
    const aiSummary = await generateSummary(reviews);

    await prisma.hospitalReview.create({
      data: { hospitalId: hospital.id, aiSummary },
    });
  }

  console.log('[ AI 병원 요약 - DB Seed 완료! ]');
}
