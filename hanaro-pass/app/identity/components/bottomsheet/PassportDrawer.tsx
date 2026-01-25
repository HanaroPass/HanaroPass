'use client';

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
};

export function PassportDrawer({
  open,
  onOpenChange,
  onSubmit,
  onReset,
  className,
}: PassportDrawerProps) {
  const handleSave = async (data: Record<string, string>) => {
    const result = await savePassportData(data);

    if (result.success) {
      alert('여권 정보 등록 및 로그인이 완료되었습니다.');
      if (onSubmit) onSubmit(data);
      onOpenChange(false);
    } else {
      alert(`[오류 ${result.status}] ${result.message}`);
    }
  };

  const { formData, handleSubmit, resetForm, handleFormDataChange } =
    useDrawerForm({
      onSubmit: handleSave,
      onOpenChange,
    });

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
