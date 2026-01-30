'use client';

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
  const handleDataProcess = (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());

    onSubmit?.(data as Record<string, string>);
    onOpenChange(false);
  };
  return (
    <BaseDrawer
      open={open}
      onOpenChange={onOpenChange}
      title="외국인 등록증 정보 확인"
      formAction={handleDataProcess}
      onReset={onReset || (() => {})}
      className={className}
      showButtons={true}
      isPending={false}
    >
      <CommonFields initialData={initialData} />
      <AlienFields initialData={initialData} />
      <AlienExtraFields initialData={initialData} />
    </BaseDrawer>
  );
}
