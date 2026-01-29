'use client';

import { format, parse } from 'date-fns';
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

type AlienFieldsProps = {
  initialData?: Record<string, string>;
};

function DatePicker({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: string;
}) {
  const [date, setDate] = useState<Date | undefined>(() =>
    defaultValue ? parse(defaultValue, 'yyyy-MM-dd', new Date()) : undefined,
  );

  const [dateStr, setDateStr] = useState(defaultValue || '');

  return (
    <>
      <input type="hidden" name={name} value={dateStr} />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="h-12 w-full justify-start border-0 bg-gray-50 text-left font-normal"
          >
            {date ? (
              format(date, 'yyyy-MM-dd', { locale: ko })
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
                const formatted = format(newDate, 'yyyy-MM-dd');
                setDateStr(formatted);
              }
            }}
            locale={ko}
          />
        </PopoverContent>
      </Popover>
    </>
  );
}

export function AlienFields({ initialData = {} }: AlienFieldsProps) {
  return (
    <div className="space-y-2">
      <Label className="font-normal text-gray-600 text-sm">
        외국인 등록 번호
      </Label>
      <div className="flex items-center gap-1.5">
        <Input
          name="registrationNumber"
          type="text"
          placeholder="020919"
          maxLength={6}
          defaultValue={initialData.registrationNumber || ''}
          className="h-12 flex-1 border-0 bg-gray-50"
        />
        <span className="px-2 text-gray-600">-</span>
        <Input
          name="registrationNumberSuffix"
          type="password"
          placeholder="•••••••"
          maxLength={7}
          defaultValue={initialData.registrationNumberSuffix || ''}
          className="h-12 flex-1 border-0 bg-gray-50"
        />
      </div>
    </div>
  );
}

// 외국인등록증용 추가 필드
export function AlienExtraFields({ initialData = {} }: AlienFieldsProps) {
  return (
    <>
      {/* 체류자격 */}
      <div className="space-y-2">
        <Label className="font-normal text-gray-600 text-sm">체류자격</Label>
        <Input
          name="residenceStatus"
          type="text"
          placeholder="D-8"
          defaultValue={initialData.residenceStatus || ''}
          className="h-12 border-0 bg-gray-50"
        />
      </div>

      {/* 발급일자 */}
      <div className="space-y-2">
        <Label className="font-normal text-gray-600 text-sm">발급일자</Label>
        <DatePicker
          name="issueDate"
          defaultValue={initialData.issueDate || ''}
        />
      </div>
    </>
  );
}
