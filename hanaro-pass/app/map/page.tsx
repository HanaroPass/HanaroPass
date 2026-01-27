import { getUserIdFromSession } from '@/lib/session';
import { getHospitals } from './actions/hospitals';
import MapPageClient from './mapPageClient';
import { getHospitalAiSummary } from './services/hospitalAiSummary';

const MOCK_REVIEWS_BY_TYPE = {
  fast: ['대기 시간이 거의 없었어요', '접수가 빨라서 바로 진료를 받았어요'],
  foreigner: [
    '영어로 설명을 잘 해줘서 편했어요',
    '외국인 환자 응대가 자연스러웠어요',
  ],
  facility: ['시설이 깔끔하고 현대적이었어요', '병원이 전반적으로 깨끗했어요'],
  crowded: [
    '사람이 많았지만 직원들이 친절했어요',
    '조금 붐볐지만 체계적으로 운영됐어요',
  ],
};

function pickRandomReviews() {
  return Object.values(MOCK_REVIEWS_BY_TYPE)
    .flat()
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);
}

export default async function Page() {
  const userId = await getUserIdFromSession();
  const hospitals = await getHospitals();

  const hospitalsWithSummary = await Promise.all(
    hospitals.map(async (h) => ({
      ...h,
      aiSummary: await getHospitalAiSummary({
        reviews: pickRandomReviews(),
      }),
    })),
  );

  return <MapPageClient hospitals={hospitalsWithSummary} userId={userId} />;
}
