'use client';

import * as React from 'react';
import { FileX2, X } from 'lucide-react';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/customDrawer';

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
  // 서류가 모두 있는 경우 추가할 서류가 없음 -> children이 비어있는지 확인
  const isEmpty = React.Children.count(children) === 0;
  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent
        className="-translate-x-1/2 left-1/2 w-full max-w-93.75"
        aria-describedby={undefined}
      >
        <div className="w-full">
          {/* 헤더 */}
          <DrawerHeader className="flex flex-row items-center justify-between px-5 py-4">
            <DrawerTitle className="font-bold font-sans text-[18px] text-black-900">
              서류 선택
            </DrawerTitle>

            {/* 닫기 버튼 */}
            <DrawerClose asChild>
              <button
                type="button"
                aria-label="닫기"
                className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-black/5 active:scale-95 active:bg-black/10"
              >
                <X size={20} />
              </button>
            </DrawerClose>
          </DrawerHeader>

          {/* 구분선 */}
          <div className="h-px bg-black/10" />

          {/* 서류 리스트 영역 */}
          <div className="px-5 pt-2 pb-8">
            {isEmpty ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileX2 className="mb-3 text-gray-300" size={48} />
                <p className="font-medium text-gray-500 text-sm">
                  추가할 서류가 없습니다.
                </p>
              </div>
            ) : (
              children
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
