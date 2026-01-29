'use client';

import { FileX2, X } from 'lucide-react';
import * as React from 'react';

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
  const isEmpty = React.Children.count(children) === 0;
  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="w-full" aria-describedby={undefined}>
        <div className="w-full">
          <DrawerHeader className="flex flex-row items-center justify-between px-5 py-4">
            <DrawerTitle className="font-bold font-sans text-[18px] text-black-900">
              서류 선택
            </DrawerTitle>
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

          <div className="h-px bg-black/10" />

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
