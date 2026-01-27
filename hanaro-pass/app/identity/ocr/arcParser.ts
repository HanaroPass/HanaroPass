// 외국인등록증 정보 파싱 전용 함수

import type { ParsedData } from './ocrTypes';

// 외국인등록증 정보 파싱 함수
export const parseArcData = (text: string): ParsedData => {
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  const data: ParsedData = {};
  const fullText = text.replace(/\s+/g, ' ');

  console.log('파싱할 텍스트 라인들:', lines);

  // 외국인등록번호 (다양한 형태로 인식)
  const arcNumberPatterns = [
    /(\d{6})-(\d{7})/, // 기본형: 123456-1234567
    /(\d{6})\s+(\d{7})/, // 공백형: 123456 1234567
    /외국인.*?(\d{6})-?(\d{7})/, // 라벨 포함
  ];

  for (const pattern of arcNumberPatterns) {
    const match = fullText.match(pattern);
    if (match && !data.arcNumber) {
      const fullArcNumber = `${match[1]}-${match[2]}`;
      data.arcNumber = fullArcNumber;
      // UI를 위해 앞 6자리와 뒤 7자리로 분리
      data.registrationNumber = match[1];
      data.registrationNumberSuffix = match[2];
      break;
    }
  }

  // 이름 파싱 (더 강력한 패턴)
  let nameFound = false;

  // 패턴 1: 성명/Name 라벨 다음
  const nameWithLabel = fullText.match(/(?:성명|Name).*?([A-Z]+)\s+([A-Z]+)/i);
  if (nameWithLabel && !nameFound) {
    data.lastName = nameWithLabel[1];
    data.firstName = nameWithLabel[2];
    nameFound = true;
  }

  // 패턴 2: 일반적인 영문 이름 (2단어)
  if (!nameFound) {
    const nameMatch = fullText.match(/\b([A-Z]{2,})\s+([A-Z]{2,})\b/);
    if (nameMatch) {
      data.lastName = nameMatch[1];
      data.firstName = nameMatch[2];
    }
  }

  // nickname 생성 (성 + 이름)
  if (data.lastName && data.firstName && !data.nickname) {
    data.nickname = `${data.lastName} ${data.firstName}`;
  }

  // 국적 (더 다양한 패턴)
  const nationalityPatterns = [
    /(?:국적|Nationality).*?(REPUBLIC OF [A-Z]+)/i,
    /(?:국적|Nationality).*?([A-Z]{3,})/i,
    /REPUBLIC OF ([A-Z]+)/,
  ];

  for (const pattern of nationalityPatterns) {
    const match = fullText.match(pattern);
    if (match && !data.nationality) {
      data.nationality = match[1];
      break;
    }
  }

  // 발급일자 (다양한 형태 지원)
  if (!data.issuedDate) {
    // 패턴 1: YYYY.MM.DD 형태 (예: 2018.09.21)
    const dotDateMatch = fullText.match(/(\d{4})\.(\d{1,2})\.(\d{1,2})/);
    if (dotDateMatch) {
      const year = dotDateMatch[1];
      const month = dotDateMatch[2].padStart(2, '0');
      const day = dotDateMatch[3].padStart(2, '0');
      const yearNum = parseInt(year, 10);
      if (yearNum >= 2010 && yearNum <= 2030) {
        data.issueDate = `${year}-${month}-${day}`;
      }
    }
  }

  // 발급일자 - 8자리 숫자 형태 백업
  if (!data.issueDate) {
    const issueDateMatches = fullText.match(/(\d{8})/g);
    if (issueDateMatches) {
      for (const dateStr of issueDateMatches) {
        const year = dateStr.substring(0, 4);
        const month = dateStr.substring(4, 6);
        const day = dateStr.substring(6, 8);

        const yearNum = parseInt(year, 10);
        const monthNum = parseInt(month, 10);
        const dayNum = parseInt(day, 10);

        // 유효한 발급일자 조건: 2010-2030년 사이, 유효한 월/일
        if (
          yearNum >= 2010 &&
          yearNum <= 2030 &&
          monthNum >= 1 &&
          monthNum <= 12 &&
          dayNum >= 1 &&
          dayNum <= 31
        ) {
          data.issueDate = `${year}-${month}-${day}`;
          break;
        }
      }
    }
  }

  // 체류자격 (폼 필드명에 맞춰 residenceStatus로 변경)
  const visaStatusMatch = fullText.match(/([A-Z]-\d+)/);
  if (visaStatusMatch && !data.residenceStatus) {
    data.residenceStatus = visaStatusMatch[1];
  }

  return data;
};
