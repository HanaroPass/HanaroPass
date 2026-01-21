'use client';

import { useDrawerForm } from './hooks/useDrawerForm';
import { AccountFields } from './shared/AccountFields';
import { BaseDrawer } from './shared/BaseDrawer';

type AccountDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: Record<string, string>) => void;
  className?: string;
};

export function AccountDrawer({
  open,
  onOpenChange,
  onSubmit,
  className,
}: AccountDrawerProps) {
  const { formData, handleSubmit, resetForm, handleFormDataChange } =
    useDrawerForm({
      onSubmit,
      onOpenChange,
    });

  return (
    <BaseDrawer
      open={open}
      onOpenChange={onOpenChange}
      title="출입계좌 선택"
      onSubmit={handleSubmit}
      onReset={resetForm}
      className={className}
      showButtons={false}
    >
      <AccountFields
        formData={formData}
        onFormDataChange={handleFormDataChange}
      />
    </BaseDrawer>
  );
}
