import { NATIONALITIES } from '@/constants/constants';
import type { ParsedData } from './ocrTypes';

export const parseArcData = (text: string): ParsedData => {
  const data: ParsedData = {};
  // 모든 공백과 줄바꿈을 단일 공백으로 치환하여 분석 효율을 극대화합니다.
  const fullText = text.replace(/\s+/g, ' ');

  // 1. 외국인등록번호 (123456-1234567)
  const arcNumberMatch = fullText.match(/(\d{6})\s*-\s*(\d{7})/);
  if (arcNumberMatch) {
    data.arcNumber = `${arcNumberMatch[1]}-${arcNumberMatch[2]}`;
    data.registrationNumber = arcNumberMatch[1];
    data.registrationNumberSuffix = arcNumberMatch[2];
  }

  // 2. 성별 추출 (F/M) - 번호 근처나 '별' 키워드 근처에서 탐색
  const genderMatch =
    fullText.match(/\b([MF])\b/i) || fullText.match(/[별\s]+([MF])\b/i);
  if (genderMatch) {
    data.gender = genderMatch[1].toUpperCase() === 'M' ? 'MALE' : 'FEMALE';
  }

  // 3. 성명 (Anna Patricia Lopez -> 성: LOPEZ / 이름: ANNA PATRICIA)
  // '성' 뒤에 어떤 깨진 소문자(do 등)가 오더라도 대문자/소문자 이름을 낚아챕니다.
  const nameMatch = fullText.match(
    /(?:성\s*명|성\s*[a-z]{0,3}|Name)\s*[:\s]*([A-Za-z\s]{3,})/i,
  );
  const forbiddenWords = [
    'ALIEN',
    'REGISTRATION',
    'CARD',
    'REPUBLIC',
    'KOREA',
    'OF',
    'THE',
  ];

  if (nameMatch) {
    const rawName = nameMatch[1].trim().split(/\s+/);
    // 금지어 필터링
    const filteredWords = rawName.filter(
      (word) => !forbiddenWords.includes(word.toUpperCase()),
    );

    if (filteredWords.length >= 2) {
      // ✅ 규칙: 마지막 한 단어만 성(lastName)
      const last = filteredWords.pop();
      data.lastName = last ? last.toUpperCase() : '';
      // ✅ 규칙: 앞의 나머지 모든 단어를 이름(firstName)으로 합침
      data.firstName = filteredWords.join(' ').toUpperCase();
      data.nickname = `${data.lastName} ${data.firstName}`;
    }
  }

  // 4. 국적 (REPUBLIC OF THE PHILIPPINES 등 상수에 대응)
  const foundNationality = NATIONALITIES.find((nat) => {
    const upperText = fullText.toUpperCase();
    return upperText.includes(nat.value.toUpperCase());
  });
  data.nationality = foundNationality ? foundNationality.value : '';

  // 5. 체류자격 (D-8, A-1 등 비자 코드 추출)
  const visaStatusMatch = fullText.match(/([A-Z]-\d+)/);
  if (visaStatusMatch) {
    data.residenceStatus = visaStatusMatch[1];
  }

  // 6. 발급일자 (2011.11 또는 2020.11 대응)
  // 규칙: 일이 누락된 경우 자동으로 '01'일을 기본값으로 채워 YYYY-MM-DD 포맷을 맞춥니다.
  const issueDateMatch = fullText.match(
    /(?:발급일자|Date\s*of\s*Issue)\s*(\d{4})[\s.](\d{1,2})(?:[\s.](\d{1,2}))?/i,
  );
  if (issueDateMatch) {
    const year = issueDateMatch[1];
    const month = issueDateMatch[2].padStart(2, '0');
    const day = (issueDateMatch[3] || '01').padStart(2, '0');

    const yearNum = parseInt(year, 10);
    if (yearNum >= 2000 && yearNum <= 2036) {
      data.issueDate = `${year}-${month}-${day}`;
    }
  }

  return data;
};
