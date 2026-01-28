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
import { NATIONALITIES } from '@/constants/constants';

type CommonFieldsProps = {
  initialData?: Record<string, string>;
};

// 공통 필드 (이름, 국적)
export function CommonFields({ initialData = {} }: CommonFieldsProps) {
  return (
    <>
      {/* 성과 이름 */}
      <div className="flex gap-8.25">
        <div className="flex-1 space-y-2">
          <Label className="font-normal text-gray-600 text-sm">성</Label>
          <Input
            name="lastName"
            type="text"
            defaultValue={initialData.lastName || ''}
            className="h-12 border-0 bg-gray-50"
          />
        </div>
        <div className="flex-1 space-y-2">
          <Label className="font-normal text-gray-600 text-sm">이름</Label>
          <Input
            name="firstName"
            type="text"
            defaultValue={initialData.firstName || ''}
            className="h-12 border-0 bg-gray-50"
          />
        </div>
      </div>

      {/* 국적 */}
      <div className="space-y-2">
        <Label className="font-normal text-gray-600 text-sm">국적</Label>
        <Select name="nationality" defaultValue={initialData.nationality || ''}>
          <SelectTrigger className="flex h-12 min-h-12 w-full items-center border-0 bg-gray-50">
            <SelectValue placeholder="선택하세요" />
          </SelectTrigger>
          <SelectContent>
            {NATIONALITIES.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
