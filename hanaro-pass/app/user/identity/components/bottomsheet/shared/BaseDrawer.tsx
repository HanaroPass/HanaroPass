'use client';

import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

interface BaseDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  onSubmit: () => void;
  onReset: () => void;
  className?: string;
  showButtons?: boolean;
  children: ReactNode;
}

export function BaseDrawer({
  open,
  onOpenChange,
  title,
  onSubmit,
  onReset,
  className,
  showButtons = true,
  children,
}: BaseDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className={className || 'mx-auto max-w-md'}>
        <DrawerHeader className="relative border-b">
          <DrawerTitle className="text-center font-semibold text-base">
            {title}
          </DrawerTitle>
          <DrawerClose className="absolute top-4 right-4" aria-label="닫기">
            <X className="h-5 w-5" />
          </DrawerClose>
        </DrawerHeader>

        <div className="max-h-[60vh] space-y-6 overflow-y-auto p-6">
          {children}
        </div>

        {showButtons && (
          <div className="flex gap-3 border-t p-4">
            <Button
              variant="outline"
              className="h-12 flex-1 border-hana-green text-hana-green hover:bg-green-50"
              onClick={onReset}
            >
              재촬영
            </Button>
            <Button
              className="h-12 flex-1 bg-hana-green text-white hover:bg-green-700"
              onClick={onSubmit}
            >
              확인
            </Button>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
