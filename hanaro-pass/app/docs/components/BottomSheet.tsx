'use client';

import * as React from 'react';
import { X } from 'lucide-react';

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
  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="left-1/2 w-full max-w-93.75 -translate-x-1/2">
        <div className="w-full">
          {/* 헤더 */}
          <DrawerHeader className="flex flex-row items-center justify-between px-5 py-4">
            <DrawerTitle className="font-sans text-[18px] font-bold text-black-900">
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

          {/* 서류 리스트 */}
          <div className="px-5 pb-8 pt-2">
            {children}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}