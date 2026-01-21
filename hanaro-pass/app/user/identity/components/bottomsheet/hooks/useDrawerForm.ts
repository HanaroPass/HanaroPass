import { useState } from 'react';

interface UseDrawerFormProps {
  onSubmit?: (data: Record<string, string>) => void;
  onOpenChange: (open: boolean) => void;
}

export function useDrawerForm({ onSubmit, onOpenChange }: UseDrawerFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});

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
