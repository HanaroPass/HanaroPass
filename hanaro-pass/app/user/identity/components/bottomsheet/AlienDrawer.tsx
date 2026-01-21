'use client';

import { useDrawerForm } from './hooks/useDrawerForm';
import { AlienFields } from './shared/AlienFields';
import { BaseDrawer } from './shared/BaseDrawer';
import { AlienExtraFields, CommonFields } from './shared/CommonFields';

type AlienDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: Record<string, string>) => void;
  className?: string;
};

export function AlienDrawer({
  open,
  onOpenChange,
  onSubmit,
  className,
}: AlienDrawerProps) {
  const { formData, handleSubmit, resetForm, handleFormDataChange } =
    useDrawerForm({
      onSubmit,
      onOpenChange,
    });

  return (
    <BaseDrawer
      open={open}
      onOpenChange={onOpenChange}
      title="외국인 등록증 정보 확인"
      onSubmit={handleSubmit}
      onReset={resetForm}
      className={className}
      showButtons={true}
    >
      <CommonFields
        formData={formData}
        onFormDataChange={handleFormDataChange}
      />
      <AlienFields
        formData={formData}
        onFormDataChange={handleFormDataChange}
      />
      <AlienExtraFields
        formData={formData}
        onFormDataChange={handleFormDataChange}
      />
    </BaseDrawer>
  );
}
