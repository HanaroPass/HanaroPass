'use client';

import { useToast } from '@/hooks/useToast';
import { saveArcData } from '../../actions/saveArc';
import { useDrawerForm } from './hooks/useDrawerForm';
import { AlienExtraFields, AlienFields } from './shared/AlienFields';
import { BaseDrawer } from './shared/BaseDrawer';
import { CommonFields } from './shared/CommonFields';

type AlienDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: Record<string, string>) => void;
  onReset?: () => void;
  className?: string;
  initialData?: Record<string, string>;
};

export function AlienDrawer({
  open,
  onOpenChange,
  onSubmit,
  onReset,
  className,
  initialData = {},
}: AlienDrawerProps) {
  const { actionError } = useToast();

  const { formAction, isPending } = useDrawerForm({
    action: saveArcData,
    onSuccess: (data) => onSubmit?.(data),
    onError: (error) => actionError(error),
    onOpenChange,
  });

  return (
    <BaseDrawer
      open={open}
      onOpenChange={onOpenChange}
      title="외국인 등록증 정보 확인"
      formAction={formAction}
      onReset={onReset || (() => {})}
      className={className}
      showButtons={true}
      isPending={isPending}
    >
      <CommonFields initialData={initialData} />
      <AlienFields initialData={initialData} />
      <AlienExtraFields initialData={initialData} />
    </BaseDrawer>
  );
}
