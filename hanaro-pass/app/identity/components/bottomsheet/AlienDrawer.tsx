'use client';

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
};

export function AlienDrawer({
  open,
  onOpenChange,
  onSubmit,
  onReset,
  className,
}: AlienDrawerProps) {
  const handleSave = async (data: Record<string, string>) => {
    const result = await saveArcData(data);

    if (result.success) {
      alert('외국인 등록증 정보가 안전하게 저장되었습니다.');
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
