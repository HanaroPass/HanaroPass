import { useEffect, useState } from 'react';

export function useFormState<T extends Record<string, string>>(initialData: T) {
  const [formData, setFormData] = useState<T>(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  // 공통
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 외국인등록증 여권
  const handleValueChange = (name: keyof T, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleValueChange,
  };
}
