import { NATIONALITIES } from '@/constants/constants';
import type { ParsedData } from './ocrTypes';

export const parseArcData = (text: string): ParsedData => {
  const data: ParsedData = {};
  const fullText = text.replace(/\s+/g, ' ');

  // 외국인등록번호
  const arcNumberPatterns = [
    /(\d{6})-(\d{7})/,
    /(\d{6})\s+(\d{7})/,
    /외국인.*?(\d{6})-?(\d{7})/,
  ];

  for (const pattern of arcNumberPatterns) {
    const match = fullText.match(pattern);
    if (match && !data.arcNumber) {
      const fullArcNumber = `${match[1]}-${match[2]}`;
      data.arcNumber = fullArcNumber;

      data.registrationNumber = match[1];
      data.registrationNumberSuffix = match[2];
      break;
    }
  }

  // 이름 파싱
  let nameFound = false;

  const nameWithLabel = fullText.match(/(?:성명|Name).*?([A-Z]+)\s+([A-Z]+)/i);
  if (nameWithLabel && !nameFound) {
    data.lastName = nameWithLabel[1];
    data.firstName = nameWithLabel[2];
    nameFound = true;
  }

  if (!nameFound) {
    const nameMatch = fullText.match(/\b([A-Z]{2,})\s+([A-Z]{2,})\b/);
    if (nameMatch) {
      data.lastName = nameMatch[1];
      data.firstName = nameMatch[2];
    }
  }

  // nickname
  if (data.lastName && data.firstName && !data.nickname) {
    data.nickname = `${data.lastName} ${data.firstName}`;
  }

  // 국적 - OCR에서 파싱하되, 유효한 국적이 없으면 빈 값으로 설정 (사용자가 직접 선택)
  const nationalityPatterns = [
    /(?:국적|Nationality).*?(REPUBLIC OF [A-Z]+)/i,
    /(?:국적|Nationality).*?([A-Z]{3,})/i,
    /REPUBLIC OF ([A-Z]+)/,
  ];

  // NATIONALITIES에서 유효한 국적 찾기
  let foundNationality = null;
  for (const pattern of nationalityPatterns) {
    const match = fullText.match(pattern);
    if (match) {
      const parsedNationality = match[1];
      // NATIONALITIES 배열에서 해당 국적이 있는지 확인
      foundNationality = NATIONALITIES.find(
        (nat) =>
          nat.value.toUpperCase().includes(parsedNationality.toUpperCase()) ||
          parsedNationality.toUpperCase().includes(nat.value.toUpperCase()),
      );
      if (foundNationality) break;
    }
  }

  // 파싱된 국적이 유효하면 설정, 아니면 사용자가 직접 선택
  data.nationality = foundNationality ? foundNationality.value : '';

  // 발급일자
  if (!data.issueDate) {
    // YYYY.MM.DD 형태
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

  // 발급일자
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

        // 유효한 발급일자 조건 검사
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
  // 체류자격
  const visaStatusMatch = fullText.match(/([A-Z]-\d+)/);
  if (visaStatusMatch && !data.residenceStatus) {
    data.residenceStatus = visaStatusMatch[1];
  }

  return data;
};
