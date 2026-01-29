import OpenAI from 'openai';
import { PrismaClient } from '../generated/prisma';
import { pickRandomReviews } from '@/app/map/constants/hospitalsReview';

const prisma = new PrismaClient();
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
${reviews.map(r => `- ${r}`).join('\n')}
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3,
  });

  return response.choices[0].message?.content?.trim() || '';
}

async function main() {
  console.log('💡 DB Seed 시작...');

  // DB에서 모든 병원 가져오기
  const hospitals = await prisma.hospital.findMany();

  for (const hospital of hospitals) {
    // 1️⃣ 병원별 랜덤 후기 4개
    const reviews = pickRandomReviews();

    // 2️⃣ AI 한 줄 요약 생성
    const aiSummary = await generateSummary(reviews);

    // 3️⃣ HospitalReview 테이블에 upsert
    await prisma.hospitalReview.upsert({
      where: { hospitalId: hospital.id },
      update: { aiSummary },
      create: { hospitalId: hospital.id, aiSummary },
    });

    console.log(`✅ 병원 ${hospital.nameKo} AI 요약 완료`);
  }

  console.log('💡 DB Seed 완료!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
