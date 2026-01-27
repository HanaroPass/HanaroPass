'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';

export type ConfirmModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
  variant?: 'danger' | 'primary' | 'success';
};

export function ConfirmModal({
  open,
  onOpenChange,
  title,
  description,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  variant = 'primary',
}: ConfirmModalProps) {
  const variantClassMap = {
    primary: 'bg-black-900 hover:bg-black/80 active:bg-black/70',
    danger: 'bg-red-500 hover:bg-red-600 active:bg-red-700',
    success: '!bg-hana-green hover:!bg-hana-green/80 active:!bg-hana-green/90',
  } as const;
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="fixed top-[50%] left-[50%] z-50 w-75 max-w-none translate-x-[-50%] translate-y-[-50%] rounded-[24px] border-none bg-white p-6 shadow-2xl">
        <AlertDialogHeader className="flex flex-col gap-4">
          <AlertDialogTitle className="text-center font-bold text-[17px] text-black-900">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="break-keep text-center text-[14px] text-gray-500 leading-snug">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-8 flex flex-row gap-2 sm:flex-row">
          <AlertDialogCancel className="mt-0 h-11 flex-1 rounded-xl border-none bg-gray-100 font-medium text-[14px] text-gray-600 hover:bg-gray-200">
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={async (e) => {
              e.preventDefault();
              try {
                await onConfirm();
                onOpenChange(false);
              } catch (err) {
                console.error(err);
              }
            }}
            className={cn(
              'h-11 flex-1 rounded-xl font-semibold text-[14px] text-white shadow-none',
              variantClassMap[variant],
            )}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
