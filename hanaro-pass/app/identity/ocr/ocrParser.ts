// OCR 결과 파싱을 위한 유틸리티 함수들

export interface ParsedData {
  [key: string]: string;
}

// 여권 정보 파싱 함수
export const parsePassportData = (text: string): ParsedData => {
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  const data: ParsedData = {};
  const fullText = text.replace(/\s+/g, ' ');

  console.log('여권 파싱할 텍스트:', lines);

  // 성 (다양한 패턴 - 범용적)
  if (!data.lastName) {
    const surnamePatterns = [
      /(?:성.*?Surname|Surname)\s*[:\s]+([A-Z]{2,})/i,
      /(?:성|Surname)\s*([A-Z]{2,})/i,
      /\b성\s*\/\s*Surname\s+([A-Z]{2,})/i,
    ];

    for (const pattern of surnamePatterns) {
      const match = fullText.match(pattern);
      if (match) {
        data.lastName = match[1];
        break;
      }
    }

    // PM 라인 이후 첫 번째 영문 대문자 단어를 성으로 추정
    if (!data.lastName) {
      const pmIndex = lines.findIndex(
        (line) => line.includes('PM') && line.includes('KOR'),
      );
      if (pmIndex !== -1) {
        // PM 라인 다음 3줄 내에서 영문 대문자만으로 된 단어 찾기
        for (
          let i = pmIndex + 1;
          i < Math.min(pmIndex + 4, lines.length);
          i++
        ) {
          const line = lines[i].trim();
          if (
            /^[A-Z]{2,}$/.test(line) &&
            ![
              'THE',
              'AND',
              'FOR',
              'ARE',
              'BUT',
              'NOT',
              'YOU',
              'ALL',
              'CAN',
              'KOR',
              'KOREA',
            ].includes(line)
          ) {
            data.lastName = line;
            break;
          }
        }
      }
    }
  }

  // 이름 (다양한 패턴 - 범용적)
  if (!data.firstName) {
    const givenNamePatterns = [
      /(?:이름.*?Given names|Given names)\s*[:\s]+([A-Z]{2,})/i,
      /(?:이름|Given names)\s*([A-Z]{2,})/i,
      /\b이름\s*\/\s*Given names\s+([A-Z]{2,})/i,
    ];

    for (const pattern of givenNamePatterns) {
      const match = fullText.match(pattern);
      if (match) {
        data.firstName = match[1];
        break;
      }
    }

    // 성을 찾았다면, 그 다음에 나오는 영문 대문자 단어를 이름으로 추정
    if (!data.firstName && data.lastName) {
      const lastNameIndex = lines.findIndex(
        (line) => line.trim() === data.lastName,
      );
      if (lastNameIndex !== -1) {
        // 성 다음 3줄 내에서 영문 대문자만으로 된 단어 찾기
        for (
          let i = lastNameIndex + 1;
          i < Math.min(lastNameIndex + 4, lines.length);
          i++
        ) {
          const line = lines[i].trim();
          if (
            /^[A-Z]{2,}$/.test(line) &&
            line !== data.lastName &&
            ![
              'THE',
              'AND',
              'FOR',
              'ARE',
              'BUT',
              'NOT',
              'YOU',
              'ALL',
              'CAN',
              'KOR',
              'KOREA',
            ].includes(line)
          ) {
            data.firstName = line;
            break;
          }
        }
      }
    }

    // MRZ 라인에서 이름 추출 (마지막 라인의 패턴)
    if (!data.firstName) {
      const mrzPattern = /([A-Z]+)<<([A-Z]+)</;
      const mrzMatch = fullText.match(mrzPattern);
      if (mrzMatch) {
        if (!data.lastName) data.lastName = mrzMatch[1];
        data.firstName = mrzMatch[2];
      }
    }
  }

  // nickname 생성 (성 + 이름)
  if (data.lastName && data.firstName && !data.nickname) {
    data.nickname = `${data.lastName} ${data.firstName}`;
  }

  // 여권번호 (기본 패턴)
  if (!data.passportNumber) {
    const passportPatterns = [
      /(?:Passport\s*No\.?|여권번호)[\s:]*([A-Z]\d{8})/i,
      /\b([A-Z]\d{8})\b/g,
      /([A-Z]\d{8})/g,
    ];

    for (const pattern of passportPatterns) {
      const match = fullText.match(pattern);
      if (match) {
        if (pattern.global && match.length > 1) {
          // 여러 매치가 있는 경우, M으로 시작하는 것 우선
          const mPassport = match.find((m) => m.startsWith('M'));
          if (mPassport) {
            data.passportNumber = mPassport;
            break;
          }
        }
        data.passportNumber = match[1] || match[0];
        break;
      }
    }
  }

  // 국적 (다양한 패턴)
  if (!data.nationality) {
    const nationalityPatterns = [
      /(?:국적.*?Nationality|Nationality)\s*[:\s]*(REPUBLIC OF [A-Z]+)/i,
      /(?:국적.*?Nationality|Nationality)\s*[:\s]*([A-Z]{3,})/i,
      /REPUBLIC OF ([A-Z]+)/i,
      /\b(KOREA|KOREAN|KOR)\b/i,
    ];

    for (const pattern of nationalityPatterns) {
      const match = fullText.match(pattern);
      if (match) {
        data.nationality = match[1];
        break;
      }
    }
  }

  // 성별 (다양한 위치에서)
  if (!data.gender) {
    const genderPatterns = [
      /(?:Sex|성별)\s*[:\s]*([MF])/i,
      /\b([MF])\s*(?:Sex|성별)/i,
      /\b성별[:\s]*([MF])/i,
    ];

    for (const pattern of genderPatterns) {
      const match = fullText.match(pattern);
      if (match) {
        data.gender = match[1].toUpperCase() === 'M' ? 'MALE' : 'FEMALE';
        break;
      }
    }
  }

  // 발급일 (OCR 결과에 맞는 패턴)
  if (!data.issueDate) {
    const issueDatePatterns = [
      // "15 8월/&446 2020" 형태 - OCR 오류 문자 포함
      /(\d{1,2})\s+8월\/[^0-9]*(\d{4})/i,
      // 일반적인 8월 패턴
      /(\d{1,2})\s+(?:8월|AUG).*?(\d{4})/i,
      // 표준 날짜 형태
      /(\d{4})[.\-/](\d{1,2})[.\-/](\d{1,2})/,
      /(\d{2})[.\-/](\d{2})[.\-/](\d{4})/,
      /(\d{8})/g, // 8자리 숫자
    ];

    for (const pattern of issueDatePatterns) {
      const match = fullText.match(pattern);
      if (match) {
        if (pattern.source.includes('8월')) {
          const day = match[1].padStart(2, '0');
          const year = match[2];
          data.issueDate = `${year}-08-${day}`;
          break;
        } else if (pattern.source.includes('[.-/]')) {
          let year, month, day;
          if (match[1].length === 4) {
            // YYYY-MM-DD
            year = match[1];
            month = match[2].padStart(2, '0');
            day = match[3].padStart(2, '0');
          } else {
            // DD-MM-YYYY
            day = match[1].padStart(2, '0');
            month = match[2].padStart(2, '0');
            year = match[3];
          }
          const yearNum = parseInt(year, 10);
          if (yearNum >= 2010 && yearNum <= 2030) {
            data.issueDate = `${year}-${month}-${day}`;
            break;
          }
        }
      }
    }
  }

  // issueDate가 없으면 기본값 설정
  if (!data.issueDate) {
    data.issueDate = new Date().toISOString().split('T')[0];
  }

  // 기간 만료일 (범용적 패턴)
  if (!data.expiryDate) {
    const monthMap: { [key: string]: string } = {
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

    // OCR 결과 패턴: "15 8월/&446 2020           15 8월/&446 2030"
    const koreanDoubleDatePattern =
      /(\d{1,2})\s+8월\/[^0-9]*(\d{4})\s+(\d{1,2})\s+8월\/[^0-9]*(\d{4})/i;
    const koreanDoubleDateMatch = fullText.match(koreanDoubleDatePattern);

    if (koreanDoubleDateMatch) {
      // 두 번째 날짜를 만료일로 사용
      const day = koreanDoubleDateMatch[3].padStart(2, '0');
      const year = koreanDoubleDateMatch[4];
      data.expiryDate = `${year}-08-${day}`;
    } else {
      // 기존 영어 패턴도 유지
      const doubleDatePattern =
        /(\d{1,2})\s+(?:\d*\s*\/?)?\s*(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\s+(\d{4})\s+(\d{1,2})\s+(?:\d*\s*\/?)?\s*(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\s+(\d{4})/i;
      const doubleDateMatch = fullText.match(doubleDatePattern);

      if (doubleDateMatch) {
        // 두 번째 날짜를 만료일로 사용
        const day = doubleDateMatch[4].padStart(2, '0');
        const monthStr = doubleDateMatch[5].toUpperCase();
        const year = doubleDateMatch[6];
        const month = monthMap[monthStr];
        if (month) {
          data.expiryDate = `${year}-${month}-${day}`;
        }
      } else {
        // 모든 날짜를 찾아서 가장 미래의 날짜를 만료일로 선택
        const allDatePattern =
          /(\d{1,2})\s+(?:\d*\s*\/?)?\s*(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC|1월|2월|3월|4월|5월|6월|7월|8월|9월|10월|11월|12월)\s+(\d{4})/gi;
        const allDates = [];
        let match;

        while ((match = allDatePattern.exec(fullText)) !== null) {
          const day = match[1].padStart(2, '0');
          const monthStr = match[2].toUpperCase();
          const year = match[3];
          const month = monthMap[monthStr];
          if (month) {
            const dateStr = `${year}-${month}-${day}`;
            const dateObj = new Date(
              parseInt(year, 10),
              parseInt(month, 10) - 1,
              parseInt(day, 10),
            );
            allDates.push({ date: dateStr, timestamp: dateObj.getTime() });
          }
        }

        // 가장 미래의 날짜를 만료일로 선택
        if (allDates.length > 1) {
          allDates.sort((a, b) => b.timestamp - a.timestamp);
          data.expiryDate = allDates[0].date;
        }
      }
    }
  }

  return data;
};

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
        data.issuedDate = `${year}-${month}-${day}`;
      }
    }
  }

  // 발급일자 - 8자리 숫자 형태 백업
  if (!data.issuedDate) {
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
          data.issuedDate = `${year}-${month}-${day}`;
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
