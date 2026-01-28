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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type PassportFieldsProps = {
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

export function PassportFields({ initialData = {} }: PassportFieldsProps) {
  const [selectedGender, setSelectedGender] = useState(
    initialData.gender || '',
  );

  return (
    <div className="flex gap-8.25">
      <div className="flex-1 space-y-2">
        <Label className="font-normal text-gray-600 text-sm">여권번호</Label>
        <Input
          name="passportNumber"
          type="text"
          placeholder="M12345678"
          defaultValue={initialData.passportNumber || ''}
          className="h-12 border-0 bg-gray-50"
        />
      </div>
      <div className="flex-1 space-y-2">
        <Label className="font-normal text-gray-600 text-sm">성별</Label>
        <input type="hidden" name="gender" value={selectedGender} />
        <Select value={selectedGender} onValueChange={setSelectedGender}>
          <SelectTrigger className="flex h-12 min-h-12 w-full items-center border-0 bg-gray-50">
            <SelectValue placeholder="선택하세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="MALE">M</SelectItem>
            <SelectItem value="FEMALE">F</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

// 여권용 날짜 필드
export function PassportDateFields({ initialData = {} }: PassportFieldsProps) {
  return (
    <>
      {/* 발급일 */}
      <div className="space-y-2">
        <Label className="font-normal text-gray-600 text-sm">발급일</Label>
        <DatePicker
          name="issueDate"
          defaultValue={initialData.issueDate || ''}
        />
      </div>

      {/* 기간 만료일 */}
      <div className="space-y-2">
        <Label className="font-normal text-gray-600 text-sm">기간 만료일</Label>
        <DatePicker
          name="expiryDate"
          defaultValue={initialData.expiryDate || ''}
        />
      </div>
    </>
  );
}
