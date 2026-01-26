import { useEffect, useState } from 'react';

type UseDrawerFormProps = {
  onSubmit?: (data: Record<string, string>) => void;
  onOpenChange: (open: boolean) => void;
  initialData?: Record<string, string>;
};

export function useDrawerForm({
  onSubmit,
  onOpenChange,
  initialData = {},
}: UseDrawerFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>(initialData);

  // initialData가 변경되면 formData 업데이트
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleSubmit = () => {
    onSubmit?.(formData);
    onOpenChange(false);
  };

  const resetForm = () => {
    setFormData({});
  };

  const handleFormDataChange = (data: Record<string, string>) => {
    setFormData(data);
  };

  return {
    formData,
    handleSubmit,
    resetForm,
    handleFormDataChange,
  };
}
