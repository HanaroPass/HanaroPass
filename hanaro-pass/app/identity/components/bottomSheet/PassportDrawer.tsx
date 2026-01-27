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
  ocrFilledFields?: Set<string>;
};

export function PassportDrawer({
  open,
  onOpenChange,
  onSubmit,
  onReset,
  className,
  initialData = {},
  ocrFilledFields: _ocrFilledFields = new Set(),
}: PassportDrawerProps) {
  const { registerSuccess, actionError } = useToast();
  const handleSave = async (data: Record<string, string>) => {
    const result = await savePassportData(data);

    if (result.success) {
      registerSuccess('여권');

      if (onSubmit) onSubmit(data);
      onOpenChange(false);
    } else {
      actionError(result);
    }
  };

  const { formData, resetForm, handleFormDataChange } = useDrawerForm({
    onSubmit: undefined,
    onOpenChange,
    initialData,
  });
  const handleSubmit = () => {
    void handleSave(formData);
  };

  return (
    <BaseDrawer
      open={open}
      onOpenChange={onOpenChange}
      title="여권 정보 확인"
      onSubmit={handleSubmit}
      onReset={onReset || resetForm}
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
