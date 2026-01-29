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

const MOCK_PLASTIC_SURGERY_REVIEWS_BY_TYPE={
  fast: [
    '예약이 빨라서 바로 상담을 받을 수 있었어요',
    '대기 시간이 거의 없어서 편리했어요',
  ],
  foreigner: [
    '영어로 상담해주셔서 해외 환자에게도 친절했어요',
    '외국인 환자 응대가 매끄러웠어요',
  ],
  facility: [
    '시설이 깨끗하고 현대적이에요',
    '장비가 최신식이라 안심이 되었어요',
  ],
  crowded: [
    '조금 붐볐지만 스태프가 체계적으로 안내해주었어요',
    '사람이 많았지만 불편함 없이 진행됐어요',
  ],
  cosmetic: [
    '원하는 스타일을 정확히 상담해주셨어요',
    '시술 결과가 기대 이상으로 자연스러웠어요',
    '성형 상담 과정이 친절하고 상세했어요',
  ],
}

export function pickRandomReviews() {
  return Object.values(MOCK_REVIEWS_BY_TYPE)
    .flat()
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);
}


export function pickRandomPlasticReviews(){
  return Object.values(MOCK_PLASTIC_SURGERY_REVIEWS_BY_TYPE)
    .flat()
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);
}