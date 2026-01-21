'use client';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CommonFieldsProps {
  formData: Record<string, string>;
  onFormDataChange: (data: Record<string, string>) => void;
}

const NATIONALITIES = [
  { value: 'KINGDOM OF CAMBODIA', label: 'KINGDOM OF CAMBODIA' },
  {
    value: "PEOPLE'S REPUBLIC OF BANGLADESH",
    label: "PEOPLE'S REPUBLIC OF BANGLADESH",
  },
  { value: "PEOPLE'S REPUBLIC OF CHINA", label: "PEOPLE'S REPUBLIC OF CHINA" },
  { value: 'REPUBLIC OF INDONESIA', label: 'REPUBLIC OF INDONESIA' },
  { value: 'REPUBLIC OF JAPAN', label: 'REPUBLIC OF JAPAN' },
  { value: 'REPUBLIC OF KAZAKHSTAN', label: 'REPUBLIC OF KAZAKHSTAN' },
  { value: 'REPUBLIC OF MONGOLIA', label: 'REPUBLIC OF MONGOLIA' },
  { value: 'REPUBLIC OF NEPAL', label: 'REPUBLIC OF NEPAL' },
  {
    value: 'REPUBLIC OF THE PHILIPPINES',
    label: 'REPUBLIC OF THE PHILIPPINES',
  },
  { value: 'REPUBLIC OF UZBEKISTAN', label: 'REPUBLIC OF UZBEKISTAN' },
  { value: 'RUSSIAN FEDERATION', label: 'RUSSIAN FEDERATION' },
  {
    value: 'SOCIALIST REPUBLIC OF VIET NAM',
    label: 'SOCIALIST REPUBLIC OF VIET NAM',
  },
  {
    value: 'DEMOCRATIC SOCIALIST REPUBLIC OF SRI LANKA',
    label: 'DEMOCRATIC SOCIALIST REPUBLIC OF SRI LANKA',
  },
  { value: 'KINGDOM OF THAILAND', label: 'KINGDOM OF THAILAND' },
  {
    value: 'REPUBLIC OF THE UNION OF MYANMAR',
    label: 'REPUBLIC OF THE UNION OF MYANMAR',
  },
  { value: 'UNITED STATES OF AMERICA', label: 'UNITED STATES OF AMERICA' },
];

function DatePicker({
  //value,
  onChange,
}: {
  value?: string;
  onChange: (date: string) => void;
}) {
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="h-12 w-full justify-start border-0 bg-gray-50 text-left font-normal"
        >
          {date ? (
            format(date, 'yyyy.MM.dd', { locale: ko })
          ) : (
            <span className="text-gray-400">날짜 선택</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 text-gray-400" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => {
            setDate(newDate);
            if (newDate) {
              onChange(format(newDate, 'yyyy.MM.dd'));
            }
          }}
          locale={ko}
        />
      </PopoverContent>
    </Popover>
  );
}

// 공통 필드 (이름, 국적)
export function CommonFields({
  formData,
  onFormDataChange,
}: CommonFieldsProps) {
  const updateField = (field: string, value: string) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  return (
    <>
      {/* 성과 이름 */}
      <div className="flex gap-8.25">
        <div className="flex-1 space-y-2">
          <Label className="font-normal text-gray-600 text-sm">성</Label>
          <Input
            type="text"
            placeholder="한"
            value={formData.lastName || ''}
            onChange={(e) => updateField('lastName', e.target.value)}
            className="h-12 border-0 bg-gray-50"
          />
        </div>
        <div className="flex-1 space-y-2">
          <Label className="font-normal text-gray-600 text-sm">이름</Label>
          <Input
            type="text"
            placeholder="수정"
            value={formData.firstName || ''}
            onChange={(e) => updateField('firstName', e.target.value)}
            className="h-12 border-0 bg-gray-50"
          />
        </div>
      </div>

      {/* 국적 */}
      <div className="space-y-2">
        <Label className="font-normal text-gray-600 text-sm">국적</Label>
        <Select
          value={formData.nationality || ''}
          onValueChange={(value) => updateField('nationality', value)}
        >
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

// 여권용 날짜 필드
export function PassportDateFields({
  formData,
  onFormDataChange,
}: CommonFieldsProps) {
  const updateField = (field: string, value: string) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  return (
    <>
      {/* 발급일 */}
      <div className="space-y-2">
        <Label className="font-normal text-gray-600 text-sm">발급일</Label>
        <DatePicker
          value={formData.birthDate}
          onChange={(date) => updateField('birthDate', date)}
        />
      </div>

      {/* 기간 만료일 */}
      <div className="space-y-2">
        <Label className="font-normal text-gray-600 text-sm">기간 만료일</Label>
        <DatePicker
          value={formData.expiryDate}
          onChange={(date) => updateField('expiryDate', date)}
        />
      </div>
    </>
  );
}

// 외국인등록증용 추가 필드
export function AlienExtraFields({
  formData,
  onFormDataChange,
}: CommonFieldsProps) {
  const updateField = (field: string, value: string) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  return (
    <>
      {/* 체류자격 */}
      <div className="space-y-2">
        <Label className="font-normal text-gray-600 text-sm">체류자격</Label>
        <Input
          type="text"
          placeholder="D-8"
          value={formData.residenceType || ''}
          onChange={(e) => updateField('residenceType', e.target.value)}
          className="h-12 border-0 bg-gray-50"
        />
      </div>

      {/* 발급일자 */}
      <div className="space-y-2">
        <Label className="font-normal text-gray-600 text-sm">발급일자</Label>
        <DatePicker
          value={formData.issueDate}
          onChange={(date) => updateField('issueDate', date)}
        />
      </div>
    </>
  );
}
