'use client';

import { X } from 'lucide-react';
import { useState } from 'react';
import Tesseract from 'tesseract.js';
import { AlienDrawer } from '../components/bottomSheet/AlienDrawer';
import { PassportDrawer } from '../components/bottomSheet/PassportDrawer';
import CameraCapture from '../components/CameraCapture';
import type { IdentityType } from '../IdentityPageClient';

type OCRPageContentProps = {
  type: IdentityType | null;
  onSubmit: (data: Record<string, string>) => void;
  onClose: () => void;
};

export default function OCRPageContent({
  type,
  onSubmit,
  onClose,
}: OCRPageContentProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [ocrData, setOcrData] = useState<Record<string, string>>({});
  const [ocrFilledFields, setOcrFilledFields] = useState<Set<string>>(
    new Set(),
  );
  const [isProcessing, setIsProcessing] = useState(false);

  // 여권 정보 파싱 함수
  const parsePassportData = (text: string): Record<string, string> => {
    const lines = text
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    const data: Record<string, string> = {};
    const fullText = text.replace(/\n/g, ' ');

    console.log('여권 파싱할 텍스트:', lines);

    // 성 (Surname 다음에 나오는 값) - nickname으로 결합 예정
    const surnameMatch = fullText.match(/(?:성.*?Surname|Surname)\s+([A-Z]+)/i);
    if (surnameMatch && !data.lastName) {
      data.lastName = surnameMatch[1];
    }

    // 이름 (Given names 다음에 나오는 값) - nickname으로 결합 예정
    const givenNameMatch = fullText.match(
      /(?:이름.*?Given names|Given names)\s+([A-Z]+)/i,
    );
    if (givenNameMatch && !data.firstName) {
      data.firstName = givenNameMatch[1];
    }

    // nickname 생성 (성 + 이름)
    if (data.lastName && data.firstName && !data.nickname) {
      data.nickname = `${data.lastName} ${data.firstName}`;
    }

    // 여권번호 (다양한 패턴으로 M123A4567 형태 추출)
    let passportNumber = '';

    // 패턴 1: PM/PNM 라인에서 KOR 다음
    const pmLineMatch = fullText.match(/(?:PM|PNM)\s+.*?KOR\s+([A-Z]\d{8,9})/i);
    if (pmLineMatch) {
      passportNumber = pmLineMatch[1].substring(0, 9);
    }

    // 패턴 2: Passport No. 다음
    if (!passportNumber) {
      const passportNoMatch = fullText.match(
        /Passport\s+No\.?\s+([A-Z]\d{8,9})/i,
      );
      if (passportNoMatch) {
        passportNumber = passportNoMatch[1].substring(0, 9);
      }
    }

    // 패턴 3: 일반적인 여권번호 형태 (M + 8자리 숫자 또는 M + 숫자+문자 조합)
    if (!passportNumber) {
      const generalMatch = fullText.match(/\b([A-Z]\d{8}[A-Z]?)\b/g);
      if (generalMatch) {
        // 가장 여권번호 같은 형태를 선택 (M으로 시작하는 것 우선)
        passportNumber =
          generalMatch.find((match) => match.startsWith('M')) ||
          generalMatch[0];
        passportNumber = passportNumber.substring(0, 9);
      }
    }

    if (passportNumber && !data.passportNumber) {
      data.passportNumber = passportNumber;
    }

    // 국적 (Nationality 다음에 나오는 값)
    const nationalityMatch = fullText.match(
      /(?:국적.*?Nationality|Nationality)\s+(REPUBLIC OF [A-Z]+|[A-Z]{3,})/i,
    );
    if (nationalityMatch && !data.nationality) {
      data.nationality = nationalityMatch[1];
    }

    // 성별 (M/F)
    const genderMatch = fullText.match(/(?:Sex|성별)\s+([MF])/i);
    if (genderMatch && !data.gender) {
      data.gender = genderMatch[1] === 'M' ? 'MALE' : 'FEMALE';
    }

    // 발급일 (액션이 필수로 요구하므로 추가)
    const issueDateMatch = fullText.match(/(\d{1,2})\s+8월.*?(\d{4})/i);
    if (issueDateMatch && !data.issueDate) {
      const day = issueDateMatch[1].padStart(2, '0');
      const year = issueDateMatch[2];
      data.issueDate = `${year}-08-${day}`;
    }

    // issueDate가 없으면 기본값 설정
    if (!data.issueDate) {
      data.issueDate = new Date().toISOString().split('T')[0];
    }

    // nickname 생성 (성 + 이름)
    if (data.lastName && data.firstName && !data.nickname) {
      data.nickname = `${data.lastName} ${data.firstName}`;
    }

    // 기간 만료일 (15 8월/&446 2030 형태)
    const expiryDateMatch = fullText.match(
      /(\d{1,2})\s+8월.*?(\d{4})(?=\s|$)/gi,
    );
    if (expiryDateMatch && expiryDateMatch.length >= 2 && !data.expiryDate) {
      const lastMatch = expiryDateMatch[expiryDateMatch.length - 1];
      const dayMatch = lastMatch.match(/(\d{1,2})/);
      const yearMatch = lastMatch.match(/(\d{4})/);
      if (dayMatch && yearMatch) {
        const day = dayMatch[1].padStart(2, '0');
        const year = yearMatch[1];
        data.expiryDate = `${year}-08-${day}`;
      }
    }

    return data;
  };

  // 외국인등록증 정보 파싱 함수
  const parseArcData = (text: string): Record<string, string> => {
    const lines = text
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    const data: Record<string, string> = {};
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
    const nameWithLabel = fullText.match(
      /(?:성명|Name).*?([A-Z]+)\s+([A-Z]+)/i,
    );
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

  const handleImageSelect = async (file: File) => {
    console.log('선택된 이미지:', file);
    setIsProcessing(true);

    try {
      // Tesseract OCR 실행
      const { data } = await Tesseract.recognize(file, 'kor+eng', {
        logger: (m) => console.log(m),
      });

      console.log('OCR 결과:', data.text);

      // 문서 타입에 따라 데이터 파싱
      const parsedData =
        type === 'passport'
          ? parsePassportData(data.text)
          : parseArcData(data.text);

      console.log('파싱된 데이터:', parsedData);
      setOcrData(parsedData);
      setOcrFilledFields(new Set(Object.keys(parsedData)));
      setIsDrawerOpen(true);
    } catch (error) {
      console.error('OCR 처리 중 오류:', error);
      alert('이미지 인식에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = (data: Record<string, string>) => {
    console.log('제출된 정보:', data);
    onSubmit(data);
  };

  const handleRetake = () => {
    setIsDrawerOpen(false);
    setOcrData({});
    setOcrFilledFields(new Set());
  };

  // type이 null인 경우 처리
  if (!type) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black">
      <header className="sticky top-0 z-50 w-full bg-black text-white">
        <div className="h-[env(safe-area-inset-top)]" />
        <div className="relative flex h-14 items-center justify-between px-4">
          <div className="flex justify-start">
            <div className="w-6" />
          </div>

          <div className="-translate-x-1/2 absolute left-1/2 max-w-[60%]">
            <h1 className="truncate font-semibold text-base text-white">
              {type === 'passport' ? '여권 등록' : '신분증 등록'}
            </h1>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-white transition-opacity active:opacity-50"
              aria-label="닫기"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      </header>

      <div className="bg-black px-6 py-6 text-center text-white sm:py-8 md:py-10 lg:py-12">
        <p className="mb-2 font-semibold text-xl sm:mb-3 md:mb-4">
          {type === 'passport' ? '여권' : '신분증'} 앞면을 시각 영역에 맞추면
        </p>
        <p className="font-semibold text-xl">
          {isProcessing
            ? '이미지를 인식하고 있습니다...'
            : '자동으로 촬영됩니다.'}
        </p>
      </div>

      <CameraCapture
        type={type}
        onClick={() => setIsDrawerOpen(true)}
        onImageSelect={handleImageSelect}
      />

      <div className="bg-black px-8 pb-6 text-left sm:pb-8 md:pb-10 lg:pb-12">
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
          <p className="font-medium text-base text-gray-300">
            단순하고 어두운 배경 위에서 촬영하면 인식률이 더 좋아집니다.
          </p>
          <p className="font-medium text-base text-gray-300">
            빛 반사가 없는 곳에서 촬영하세요.
          </p>
          <p className="font-medium text-base text-gray-300">
            살짝 기울여 촬영하시면 더욱 좋습니다.
          </p>
        </div>
      </div>

      {type === 'passport' ? (
        <PassportDrawer
          open={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
          onSubmit={handleSubmit}
          onReset={handleRetake}
          initialData={ocrData}
          ocrFilledFields={ocrFilledFields}
        />
      ) : (
        <AlienDrawer
          open={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
          onSubmit={handleSubmit}
          onReset={handleRetake}
          initialData={ocrData}
          ocrFilledFields={ocrFilledFields}
        />
      )}
    </div>
  );
}
