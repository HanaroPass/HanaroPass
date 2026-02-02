import { NATIONALITIES } from '@/constants/constants';

export const parseArcData = (text: string): Record<string, string> => {
  const data: Record<string, string> = {};
  const fullText = text.replace(/\s+/g, ' ');

  const arcNumberMatch = fullText.match(/(\d{6})\s*-\s*(\d{7})/);
  if (arcNumberMatch) {
    data.arcNumber = `${arcNumberMatch[1]}-${arcNumberMatch[2]}`;
    data.registrationNumber = arcNumberMatch[1];
    data.registrationNumberSuffix = arcNumberMatch[2];
  }

  const genderMatch =
    fullText.match(/\b([MF])\b/i) || fullText.match(/[별\s]+([MF])\b/i);
  if (genderMatch) {
    data.gender = genderMatch[1].toUpperCase() === 'M' ? 'MALE' : 'FEMALE';
  }

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
    const filteredWords = rawName.filter(
      (word) => !forbiddenWords.includes(word.toUpperCase()),
    );

    if (filteredWords.length >= 2) {
      const last = filteredWords.pop();
      data.lastName = last ? last.toUpperCase() : '';
      data.firstName = filteredWords.join(' ').toUpperCase();
      data.nickname = `${data.lastName} ${data.firstName}`;
    }
  }

  const foundNationality = NATIONALITIES.find((nat) => {
    const upperText = fullText.toUpperCase();
    return upperText.includes(nat.value.toUpperCase());
  });
  data.nationality = foundNationality ? foundNationality.value : '';

  const visaStatusMatch = fullText.match(/([A-Z]-\d+)/);
  if (visaStatusMatch) {
    data.residenceStatus = visaStatusMatch[1];
  }

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
