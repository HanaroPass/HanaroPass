'use client';

import { useToast } from '@/hooks/useToast';
import { savePassportData } from '../../actions/passport';
import { useDrawerForm } from './hooks/useDrawerForm';
import { BaseDrawer } from './shared/BaseDrawer';
import { CommonFields } from './shared/CommonFields';
import { PassportDateFields, PassportFields } from './shared/PassportFields';

type PassportDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: Record<string, string>) => void;
  onReset?: () => void;
  className?: string;
  initialData?: Record<string, string>;
};

const DEFAULT_INITIAL_DATA: Record<string, string> = {};

export function PassportDrawer({
  open,
  onOpenChange,
  onSubmit,
  onReset,
  className,
  initialData = DEFAULT_INITIAL_DATA,
}: PassportDrawerProps) {
  const { actionError } = useToast();

  const { state, formAction, isPending } = useDrawerForm({
    action: savePassportData,
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
      title="여권 정보 확인"
      formAction={formAction}
      onReset={onReset || (() => {})}
      className={className}
      showButtons={true}
      isPending={isPending}
    >
      <CommonFields initialData={initialData} />
      <PassportFields initialData={initialData} />
      <PassportDateFields initialData={initialData} />
    </BaseDrawer>
  );
}
