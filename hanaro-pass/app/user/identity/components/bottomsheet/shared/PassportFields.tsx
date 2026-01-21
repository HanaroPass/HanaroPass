'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PassportFieldsProps {
  formData: Record<string, string>;
  onFormDataChange: (data: Record<string, string>) => void;
}

export function PassportFields({
  formData,
  onFormDataChange,
}: PassportFieldsProps) {
  const updateField = (field: string, value: string) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  return (
    <div className="flex gap-8.25">
      <div className="flex-1 space-y-2">
        <Label className="font-normal text-gray-600 text-sm">여권번호</Label>
        <Input
          type="text"
          placeholder="M12345678"
          value={formData.passportNumber || ''}
          onChange={(e) => updateField('passportNumber', e.target.value)}
          className="h-12 border-0 bg-gray-50"
        />
      </div>
      <div className="flex-1 space-y-2">
        <Label className="font-normal text-gray-600 text-sm">성별</Label>
        <Select
          value={formData.gender || ''}
          onValueChange={(value) => updateField('gender', value)}
        >
          <SelectTrigger className="flex h-12 min-h-12 w-full items-center border-0 bg-gray-50">
            <SelectValue placeholder="선택하세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="M">M</SelectItem>
            <SelectItem value="F">F</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
