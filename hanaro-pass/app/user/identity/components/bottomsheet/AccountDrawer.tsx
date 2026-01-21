'use client';

import { useState } from 'react';
import { AccountFields } from './shared/AccountFields';
import { BaseDrawer } from './shared/BaseDrawer';

interface AccountDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: Record<string, string>) => void;
  className?: string;
}

export function AccountDrawer({
  open,
  onOpenChange,
  onSubmit,
  className,
}: AccountDrawerProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    onSubmit?.(formData);
    onOpenChange(false);
  };

  const resetForm = () => {
    setFormData({});
  };

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
      <AccountFields formData={formData} onFormDataChange={setFormData} />
    </BaseDrawer>
  );
}
