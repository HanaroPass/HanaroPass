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

type AlienFieldsProps = {
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

// 외국인등록증용 추가 필드
export function AlienExtraFields({
  formData,
  onFormDataChange,
}: AlienFieldsProps) {
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
