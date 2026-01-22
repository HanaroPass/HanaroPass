'use client';

import { X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import CameraCapture from '@/app/user/identity/components/CameraCapture';

export default function OCRPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get('type') as 'passport' | 'alien' | null;

  const handleClose = () => {
    router.back();
  };

  const getTitle = () => {
    if (type === 'passport') return '여권 등록';
    if (type === 'alien') return '신분증 등록';
  };

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
              {getTitle()}
            </h1>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="p-2 text-white transition-opacity active:opacity-50"
              aria-label="닫기"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      </header>

      <div className="bg-black px-6 py-6 text-center text-white">
        <p className="mb-2 font-semibold text-xl">
          {type === 'passport' ? '여권' : '신분증'} 앞면을 시각 영역에 맞추면
        </p>
        <p className="font-semibold text-xl">자동으로 촬영됩니다.</p>
      </div>

      <CameraCapture type={type} />

      <div className="bg-black px-8 pb-4 text-left">
        <p className="mb-4 font-medium text-base text-gray-300">
          단순하고 어두운 배경 위에서 촬영하면 인식률이 더 좋아집니다.
        </p>
        <p className="mb-4 font-medium text-base text-gray-300">
          빛 반사가 없는 곳에서 촬영하세요.
        </p>
        <p className="font-medium text-base text-gray-300">
          살짝 기울여 촬영하시면 더욱 좋습니다.
        </p>
      </div>
    </div>
  );
}
