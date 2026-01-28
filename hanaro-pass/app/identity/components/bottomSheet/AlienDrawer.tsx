'use client';

import { useToast } from '@/hooks/useToast';
import { saveArcData } from '../../actions/arc';
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

const DEFAULT_INITIAL_DATA: Record<string, string> = {};

export function AlienDrawer({
  open,
  onOpenChange,
  onSubmit,
  onReset,
  className,
  initialData = DEFAULT_INITIAL_DATA,
}: AlienDrawerProps) {
  const { actionError } = useToast();

  const { state, formAction, isPending } = useDrawerForm({
    action: saveArcData,
    onSuccess: () => onSubmit?.(initialData),
    onOpenChange,
  });

  // 에러 발생 시 토스트 표시
  if (state && !state.success) {
    actionError(state);
  }

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
