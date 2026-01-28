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

type BaseDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  formAction?: string | ((formData: FormData) => void);
  onReset: () => void;
  className?: string;
  showButtons?: boolean;
  isPending?: boolean;
  children: ReactNode;
};

export function BaseDrawer({
  open,
  onOpenChange,
  title,
  formAction,
  onReset,
  className,
  showButtons = true,
  isPending = false,
  children,
}: BaseDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className={className || 'mx-auto max-w-[375px]'}>
        <form action={formAction} key={open ? 'open' : 'closed'}>
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
                type="button"
                variant="outline"
                className="h-12 flex-1 border-hana-green text-hana-green hover:bg-green-50"
                onClick={onReset}
                disabled={isPending}
              >
                재촬영
              </Button>
              <Button
                type="submit"
                className="h-12 flex-1 bg-hana-green text-white hover:bg-green-700"
                disabled={isPending}
              >
                {isPending ? '저장 중...' : '확인'}
              </Button>
            </div>
          )}
        </form>
      </DrawerContent>
    </Drawer>
  );
}
