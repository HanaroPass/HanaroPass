'use client';

import { useDrawerForm } from './hooks/useDrawerForm';
import { BaseDrawer } from './shared/BaseDrawer';
import { CommonFields, PassportDateFields } from './shared/CommonFields';
import { PassportFields } from './shared/PassportFields';

type PassportDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: Record<string, string>) => void;
  className?: string;
};

export function PassportDrawer({
  open,
  onOpenChange,
  onSubmit,
  className,
}: PassportDrawerProps) {
  const { formData, handleSubmit, resetForm, handleFormDataChange } =
    useDrawerForm({
      onSubmit,
      onOpenChange,
    });

  return (
    <BaseDrawer
      open={open}
      onOpenChange={onOpenChange}
      title="여권 정보 확인"
      onSubmit={handleSubmit}
      onReset={resetForm}
      className={className}
      showButtons={true}
    >
      <CommonFields
        formData={formData}
        onFormDataChange={handleFormDataChange}
      />
      <PassportFields
        formData={formData}
        onFormDataChange={handleFormDataChange}
      />
      <PassportDateFields
        formData={formData}
        onFormDataChange={handleFormDataChange}
      />
    </BaseDrawer>
  );
}
