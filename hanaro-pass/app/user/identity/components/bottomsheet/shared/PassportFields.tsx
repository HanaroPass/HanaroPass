'use client';

import { format, parse } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
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

type PassportFieldsProps = {
  formData: Record<string, string>;
  onFormDataChange: (data: Record<string, string>) => void;
};

function DatePicker({
  value,
  onChange,
}: {
  value?: string;
  onChange: (date: string) => void;
}) {
  const [date, setDate] = useState<Date | undefined>(() =>
    value ? parse(value, 'yyyy.MM.dd', new Date()) : undefined,
  );

  useEffect(() => {
    if (value) {
      setDate(parse(value, 'yyyy.MM.dd', new Date()));
    } else {
      setDate(undefined);
    }
  }, [value]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
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

// 여권용 날짜 필드
export function PassportDateFields({
  formData,
  onFormDataChange,
}: PassportFieldsProps) {
  const updateField = (field: string, value: string) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  return (
    <>
      {/* 발급일 */}
      <div className="space-y-2">
        <Label className="font-normal text-gray-600 text-sm">발급일</Label>
        <DatePicker
          value={formData.issueDate}
          onChange={(date) => updateField('issueDate', date)}
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
