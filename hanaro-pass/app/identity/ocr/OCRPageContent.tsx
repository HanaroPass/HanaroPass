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

    for (const line of lines) {
      // 여권번호 (예: M12345678)
      const passportMatch = line.match(/[A-Z]\d{8}/);
      if (passportMatch && !data.passportNumber) {
        data.passportNumber = passportMatch[0];
      }

      // 생년월일 (예: 880315, 19880315)
      const birthDateMatch = line.match(/(\d{2})?(\d{6})/);
      if (birthDateMatch && !data.birthDate) {
        const fullDate = birthDateMatch[2];
        if (fullDate.length === 6) {
          const year = fullDate.substring(0, 2);
          const month = fullDate.substring(2, 4);
          const day = fullDate.substring(4, 6);
          // 80년대 이후는 19XX, 그 이전은 20XX로 가정
          const fullYear = parseInt(year, 10) >= 80 ? `19${year}` : `20${year}`;
          data.birthDate = `${fullYear}-${month}-${day}`;
        }
      }

      // 성별 (M/F)
      const genderMatch = line.match(/\b([MF])\b/);
      if (genderMatch && !data.gender) {
        data.gender = genderMatch[1] === 'M' ? 'MALE' : 'FEMALE';
      }

      // 국적 (예: KOR, USA)
      const nationalityMatch = line.match(/\b([A-Z]{3})\b/);
      if (
        nationalityMatch &&
        nationalityMatch[1] !== 'KOR' &&
        !data.nationality
      ) {
        data.nationality = nationalityMatch[1];
      }

      // 이름 (대문자 영문)
      const nameMatch = line.match(/([A-Z][A-Z\s]+[A-Z])/);
      if (nameMatch && !data.firstName && !data.lastName) {
        const fullName = nameMatch[1].trim();
        const nameParts = fullName.split(/\s+/);
        if (nameParts.length >= 2) {
          data.lastName = nameParts[0];
          data.firstName = nameParts.slice(1).join(' ');
        }
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

    console.log('파싱할 텍스트 라인들:', lines);

    for (const line of lines) {
      // 외국인등록번호 (예: 123456-1234567)
      const arcNumberMatch = line.match(/(\d{6})-(\d{7})/);
      if (arcNumberMatch && !data.registrationNumber) {
        data.registrationNumber = arcNumberMatch[1];
        data.registrationNumberSuffix = arcNumberMatch[2];
        data.arcNumber = `${arcNumberMatch[1]}-${arcNumberMatch[2]}`;
      }

      // 이름 파싱 (HONG SAMPLE 형태)
      const nameMatch = line.match(/([A-Z]+)\s+([A-Z]+)/);
      if (nameMatch && !data.lastName && !data.firstName) {
        data.lastName = nameMatch[1];
        data.firstName = nameMatch[2];
      }

      // 국적 (REPUBLIC OF UTOPIA 등)
      const nationalityMatch = line.match(/REPUBLIC OF ([A-Z]+)/);
      if (nationalityMatch && !data.nationality) {
        data.nationality = `REPUBLIC OF ${nationalityMatch[1]}`;
      }

      // 발급일자 (20230401 형태)
      const issueDateMatch = line.match(/(\d{8})/);
      if (issueDateMatch && !data.issuedDate) {
        const dateStr = issueDateMatch[1];
        if (dateStr.length === 8) {
          const year = dateStr.substring(0, 4);
          const month = dateStr.substring(4, 6);
          const day = dateStr.substring(6, 8);
          data.issuedDate = `${year}-${month}-${day}`;
        }
      }

      // 체류자격 (D-8, F-2 등)
      const visaStatusMatch = line.match(/([A-Z]-\d+)/);
      if (visaStatusMatch && !data.visaStatus) {
        data.visaStatus = visaStatusMatch[1];
      }
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
