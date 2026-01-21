'use client';

import { useState } from 'react';
import { AlienFields } from './shared/AlienFields';
import { BaseDrawer } from './shared/BaseDrawer';
import { AlienExtraFields, CommonFields } from './shared/CommonFields';

interface AlienDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: Record<string, string>) => void;
  className?: string;
}

export function AlienDrawer({
  open,
  onOpenChange,
  onSubmit,
  className,
}: AlienDrawerProps) {
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
      title="외국인 등록증 정보 확인"
      onSubmit={handleSubmit}
      onReset={resetForm}
      className={className}
      showButtons={true}
    >
      <CommonFields formData={formData} onFormDataChange={setFormData} />
      <AlienFields formData={formData} onFormDataChange={setFormData} />
      <AlienExtraFields formData={formData} onFormDataChange={setFormData} />
    </BaseDrawer>
  );
}
