'use client';

import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

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
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="docs-sheet-title"
      aria-hidden={!isOpen}
      inert={!isOpen}
      className={`fixed inset-0 z-50 flex justify-center ${isOpen ? '' : 'pointer-events-none'}`}
    >
      <div className="relative h-full w-full max-w-93.75">
        {/* 바텀시트 뒤 배경 */}
        <button
          type="button"
          aria-label="닫기"
          onClick={onClose}
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        />

        {/* 바텀시트 */}
        <div
          className={`absolute inset-x-0 bottom-0 transition-transform duration-300 ease-out ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
        >
          <div className="rounded-t-2xl bg-white">
            {/* 바텀시트의 이름 영역 */}
            <div className="flex items-center justify-between px-6 py-4">
              <h2
                id="docs-sheet-title"
                className="font-bold font-sans text-[18px] text-black-900"
              >서류 선택</h2>

              <button
                type="button"
                onClick={onClose}
                aria-label="닫기"
                className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-black/5 active:scale-95 active:bg-black/10"
              >
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
