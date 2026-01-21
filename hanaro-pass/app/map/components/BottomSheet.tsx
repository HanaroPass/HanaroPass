'use client';

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

type FilterType = 'language' | 'department' | null;

export default function BottomSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [active, setActive] = useState<FilterType>(null);
  const basePill =
    'rounded-full px-5 py-2 text-sm font-medium border transition';
  const inactivePill = 'bg-white border-gray-300 text-gray-700';
  const activePill = 'bg-green-ez border-green-ez text-white';

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[75vh] p-0">
        <DrawerHeader>
          <DrawerTitle>
            <VisuallyHidden>병원 필터</VisuallyHidden>
          </DrawerTitle>
        </DrawerHeader>

        <div className="sticky top-0 z-60 flex gap-2 border-b bg-white px-4 py-3">
          <button
            className={`${basePill} ${
              active === 'language' ? activePill : inactivePill
            }`}
            onClick={() =>
              setActive((prev) => (prev === 'language' ? null : 'language'))
            }
          >
            소통 가능 언어
          </button>

          <button
            className={`${basePill} ${
              active === 'department' ? activePill : inactivePill
            }`}
            onClick={() =>
              setActive((prev) => (prev === 'department' ? null : 'department'))
            }
          >
            진료과목
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <h2 className="font-bold text-lg">어쩌구 바른 내과</h2>
          <p className="text-muted-foreground text-sm">
            서울시 강남구 테헤란로 123
          </p>

          <Button className="mt-4 w-full rounded-10 bg-green-ez py-6 font-semibold text-base text-white hover:bg-green-ez/90">
            AI에게 나에게 맞는 병원 물어보기
          </Button>

          <div className="h-200" />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
