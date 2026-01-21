'use client';

import { X } from 'lucide-react';

type BottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function BottomSheet({
  isOpen,
  onClose,
  children,
}: BottomSheetProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-center">
      <div className="relative h-full w-full max-w-93.75">
        {/* 바텀시트 뒤 배경 */}
        <button
          type="button"
          aria-label="닫기"
          onClick={onClose}
          className="absolute inset-0 bg-black/50"
        />

        {/* 바텀시트 */}
        <div className="absolute inset-x-0 bottom-0">
          <div className="rounded-t-3xl bg-white">
            {/* 바텀시트의 이름 영역 */}
            <div className="flex items-center justify-between px-7 py-5">
              <h2 className="font-bold font-sans text-[18px] text-black-900">
                서류 선택
              </h2>

              <button type="button" onClick={onClose} aria-label="닫기">
                <X size={20} />
              </button>
            </div>

            <div className="h-px bg-black/10" />

            {/* 리스트 영역 */}
            <div className="px-5">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
