'use client';

import { useMemo } from 'react';
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

  const normalizedInitialData = useMemo(
    () => ({
      ...initialData,
      issueDate: initialData.issuedDate || initialData.issueDate || '',
    }),
    [initialData],
  );

  const handleSave = async (data: Record<string, string>) => {
    const result = await saveArcData(data);

    if (result.success) {
      if (onSubmit) onSubmit(data);
      onOpenChange(false);
    } else {
      actionError(result);
    }
  };

  const { formData, resetForm, handleFormDataChange } = useDrawerForm({
    onSubmit: undefined,
    onOpenChange,
    initialData: normalizedInitialData,
  });

  const handleSubmit = () => {
    void handleSave(formData);
  };

  return (
    <BaseDrawer
      open={open}
      onOpenChange={onOpenChange}
      title="외국인 등록증 정보 확인"
      onSubmit={handleSubmit}
      onReset={onReset || resetForm}
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
