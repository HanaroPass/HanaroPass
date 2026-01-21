'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type AlienFieldsProps = {
  formData: Record<string, string>;
  onFormDataChange: (data: Record<string, string>) => void;
};

export function AlienFields({ formData, onFormDataChange }: AlienFieldsProps) {
  const updateField = (field: string, value: string) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-2">
      <Label className="font-normal text-gray-600 text-sm">
        외국인 등록 번호
      </Label>
      <div className="flex items-center gap-1.5">
        <Input
          type="text"
          placeholder="020919"
          maxLength={6}
          value={formData.registrationNumber || ''}
          onChange={(e) => updateField('registrationNumber', e.target.value)}
          className="h-12 flex-1 border-0 bg-gray-50"
        />
        <span className="px-2 text-gray-600">-</span>
        <Input
          type="password"
          placeholder="•••••••"
          maxLength={7}
          value={formData.registrationNumberSuffix || ''}
          onChange={(e) =>
            updateField('registrationNumberSuffix', e.target.value)
          }
          className="h-12 flex-1 border-0 bg-gray-50"
        />
      </div>
    </div>
  );
}
