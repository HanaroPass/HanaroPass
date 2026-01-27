import type { ParsedData } from './ocrTypes';

export const parsePassportData = (text: string): ParsedData => {
  const data: ParsedData = {};
  const fullText = text.replace(/\s+/g, ' ');

  const monthMap: Record<string, string> = {
    JAN: '01',
    FEB: '02',
    MAR: '03',
    APR: '04',
    MAY: '05',
    JUN: '06',
    JUL: '07',
    AUG: '08',
    SEP: '09',
    OCT: '10',
    NOV: '11',
    DEC: '12',
    '1월': '01',
    '2월': '02',
    '3월': '03',
    '4월': '04',
    '5월': '05',
    '6월': '06',
    '7월': '07',
    '8월': '08',
    '9월': '09',
    '10월': '10',
    '11월': '11',
    '12월': '12',
  };

  // 1. 여권번호 추출
  const passportMatch =
    fullText.match(/PM\s+KOR\s+([A-Z][0-9A-Z]{8})/i) ||
    fullText.match(/\b([A-Z][0-9]{3}[A-Z][0-9]{4})\b/i) ||
    fullText.match(/\b([A-Z][0-9]{8})\b/i);

  if (passportMatch) {
    data.passportNumber = passportMatch[1].toUpperCase();
  }

  // 2. 이름/성 추출
  const mrzNameMatch = fullText.match(/([A-Z]+)<<([A-Z]+)</);
  if (mrzNameMatch) {
    data.lastName = mrzNameMatch[1].toUpperCase();
    data.firstName = mrzNameMatch[2].toUpperCase();
  }
  if (!data.lastName) {
    const surnameMatch = fullText.match(/(?:Surname|성)\s*[:\s]*([A-Z]{2,})/i);
    if (surnameMatch) data.lastName = surnameMatch[1].toUpperCase();
  }
  if (!data.firstName) {
    const givenNameMatch = fullText.match(
      /(?:G[a-z]+\s*names|이름)\s*[:\s]*([A-Z]{2,})/i,
    );
    if (givenNameMatch) data.firstName = givenNameMatch[1].toUpperCase();
  }

  // 3. 날짜 추출 (Dirty OCR 데이터 대응 버전)
  const flexibleDatePattern =
    /(\d{1,2})\s+.*?(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC|[1-9]월|1[0-2]월).*?(\d{4})/gi;
  interface DateInfo {
    dateStr: string;
    timestamp: number;
  }

  const foundDates: DateInfo[] = Array.from(
    fullText.matchAll(flexibleDatePattern),
  )
    .map((match) => {
      const [_, d, m, y] = match;
      const day = d.padStart(2, '0');
      const month = monthMap[m.toUpperCase()];
      if (!month) return null;
      const dateStr = `${y}-${month}-${day}`;
      const timestamp = new Date(dateStr).getTime();
      return Number.isNaN(timestamp) ? null : { dateStr, timestamp };
    })
    .filter((d): d is DateInfo => d !== null);

  // 날짜 정렬 후 할당
  if (foundDates.length > 0) {
    foundDates.sort((a, b) => a.timestamp - b.timestamp);
    if (foundDates.length >= 3) {
      data.issueDate = foundDates[1].dateStr;
      data.expiryDate = foundDates[2].dateStr;
    } else if (foundDates.length === 2) {
      data.issueDate = foundDates[0].dateStr;
      data.expiryDate = foundDates[1].dateStr;
    } else {
      data.issueDate = foundDates[0].dateStr;
    }
  }

  // 4. 성별
  const genderMatch =
    fullText.match(/\b([MF])\b/i) ||
    fullText.match(/(?:Sex|성별)\s*[:\s]*([MF])/i);
  if (genderMatch) {
    data.gender = genderMatch[1].toUpperCase() === 'M' ? 'MALE' : 'FEMALE';
  }

  // 5. 국적
  if (fullText.match(/\b(KOREA|KOREAN|KOR)\b/i)) {
    data.nationality = 'REPUBLIC OF KOREA';
  }

  return data;
};
