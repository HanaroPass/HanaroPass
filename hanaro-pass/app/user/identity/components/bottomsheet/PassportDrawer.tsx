'use client';

import { useState } from 'react';
import { BaseDrawer } from './shared/BaseDrawer';
import { CommonFields, PassportDateFields } from './shared/CommonFields';
import { PassportFields } from './shared/PassportFields';

interface PassportDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: Record<string, string>) => void;
  className?: string;
}

export function PassportDrawer({
  open,
  onOpenChange,
  onSubmit,
  className,
}: PassportDrawerProps) {
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
      title="여권 정보 확인"
      onSubmit={handleSubmit}
      onReset={resetForm}
      className={className}
      showButtons={true}
    >
      <CommonFields formData={formData} onFormDataChange={setFormData} />
      <PassportFields formData={formData} onFormDataChange={setFormData} />
      <PassportDateFields formData={formData} onFormDataChange={setFormData} />
    </BaseDrawer>
  );
}
