'use client';

import { X } from 'lucide-react';
// 1. useRef와 useEffect를 추가로 가져옵니다.
import { useEffect, useRef, useState } from 'react';
import Tesseract from 'tesseract.js';
import { AlienDrawer } from '../components/bottomSheet/AlienDrawer';
import { PassportDrawer } from '../components/bottomSheet/PassportDrawer';
import CameraCapture from '../components/CameraCapture';
import type { IdentityType } from '../IdentityPageClient';
import { parseArcData } from './arcParser';
import { parsePassportData } from './passportParser';

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

  // 2. 컴포넌트 마운트 상태를 추적할 Ref 생성
  const isMountedRef = useRef(true);

  useEffect(() => {
    // 마운트 시 true 유지
    isMountedRef.current = true;
    return () => {
      // 언마운트(페이지 이탈 등) 시 false로 변경
      isMountedRef.current = false;
    };
  }, []);

  const handleImageSelect = async (file: File) => {
    console.log('선택된 이미지:', file);
    setIsProcessing(true);

    try {
      // Tesseract OCR 실행
      const { data } = await Tesseract.recognize(file, 'kor+eng', {
        logger: (m) => console.log(m),
      });

      // 3. 비동기 작업 완료 후 컴포넌트가 여전히 살아있는지 확인
      if (!isMountedRef.current) return;

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
      // 4. 에러 발생 시에도 마운트 상태 확인
      if (!isMountedRef.current) return;
      console.error('OCR 처리 중 오류:', error);
      alert('이미지 인식에 실패했습니다. 다시 시도해주세요.');
    } finally {
      // 5. 마지막 상태 업데이트 전에도 확인
      if (isMountedRef.current) {
        setIsProcessing(false);
      }
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

  if (!type) return null;

  return (
    <div className="min-h-screen bg-black">
      {/* ... 나머지 JSX 코드는 동일합니다 ... */}
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
