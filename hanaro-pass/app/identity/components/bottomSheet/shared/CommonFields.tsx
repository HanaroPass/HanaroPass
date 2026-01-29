'use client';

import { useEffect, useState } from 'react';
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

export function CommonFields({ initialData = {} }: CommonFieldsProps) {
  const [formData, setFormData] = useState({
    lastName: initialData.lastName || '',
    firstName: initialData.firstName || '',
    nationality: initialData.nationality || '',
  });

  useEffect(() => {
    setFormData({
      lastName: initialData.lastName || '',
      firstName: initialData.firstName || '',
      nationality: initialData.nationality || '',
    });
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="flex gap-8.25">
        <div className="flex-1 space-y-2">
          <Label className="font-normal text-gray-600 text-sm">성</Label>
          <Input
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            className="h-12 border-0 bg-gray-50"
          />
        </div>
        <div className="flex-1 space-y-2">
          <Label className="font-normal text-gray-600 text-sm">이름</Label>
          <Input
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            className="h-12 border-0 bg-gray-50"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="font-normal text-gray-600 text-sm">국적</Label>
        <input type="hidden" name="nationality" value={formData.nationality} />
        <Select
          value={formData.nationality}
          onValueChange={(val) =>
            setFormData((prev) => ({ ...prev, nationality: val }))
          }
        >
          <SelectTrigger className="flex h-12 min-h-12 w-full items-center border-0 bg-gray-50">
            <SelectValue placeholder="국적을 선택해주세요" />
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
