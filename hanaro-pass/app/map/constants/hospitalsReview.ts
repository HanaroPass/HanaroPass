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

const MOCK_PLASTIC_SURGERY_REVIEWS_BY_TYPE = {
  foreigner: [
    '외국인 환자 응대가 매끄러웠어요',
    '외국인 환자 전용 안내 자료가 잘 준비되어 있어요',
    '외국인이라 많이 헷갈렸는데 비용과 옵션을 명확하게 안내해주셨어요',
  ],
  facility: [
    '레이저 장비가 최신식이라 안심이 되었어요',
    '수술실과 회복실이 깔끔하고 쾌적했어요',
    '성형 시술 결과가 기대 이상으로 자연스러웠어요',
    '성형 수술 전 모의 시뮬레이션으로 결과를 미리 확인할 수 있었어요',
  ],
  cosmetic: [
    '제 얼굴과 어울리는 스타일을 정확히 상담해주셨어요',
    '성형 상담 과정이 친절하고 상세했어요',
    '성형 부작용과 예상되는 통증에 대해 솔직히 설명해주셨어요',
    '만족스러운 성형 결과가 나왔어요',
  ],
};

export function pickRandomReviews() {
  return Object.values(MOCK_REVIEWS_BY_TYPE)
    .flat()
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);
}

export function pickRandomPlasticReviews() {
  return Object.values(MOCK_PLASTIC_SURGERY_REVIEWS_BY_TYPE)
    .flat()
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
}
