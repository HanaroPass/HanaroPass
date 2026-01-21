'use client';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CalendarIcon, Star, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
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

type IdentityType = 'passport' | 'alien-registration' | 'account';

interface IdentityFormDrawerProps {
  type: IdentityType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: Record<string, string>) => void;
  className?: string;
}

const formConfig = {
  passport: {
    title: '여권 정보 확인',
    fields: [
      { id: 'lastName', label: '성', placeholder: '한', type: 'text' },
      { id: 'firstName', label: '이름', placeholder: '수정', type: 'text' },
      {
        id: 'passportNumber',
        label: '여권번호',
        placeholder: 'M12345678',
        type: 'text',
      },
      {
        id: 'gender',
        label: '성별',
        type: 'select',
        options: [
          { value: 'M', label: 'M' },
          { value: 'F', label: 'F' },
        ],
      },
      {
        id: 'nationality',
        label: '국적',
        type: 'select',
        options: [
          { value: 'KINGDOM OF CAMBODIA', label: 'KINGDOM OF CAMBODIA' },
          {
            value: "PEOPLE'S REPUBLIC OF BANGLADESH",
            label: "PEOPLE'S REPUBLIC OF BANGLADESH",
          },
          {
            value: "PEOPLE'S REPUBLIC OF CHINA",
            label: "PEOPLE'S REPUBLIC OF CHINA",
          },
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
          {
            value: 'UNITED STATES OF AMERICA',
            label: 'UNITED STATES OF AMERICA',
          },
        ],
      },
      { id: 'birthDate', label: '발급일', type: 'date' },
      { id: 'expiryDate', label: '기간 만료일', type: 'date' },
    ],
  },
  'alien-registration': {
    title: '외국인 등록증 정보 확인',
    fields: [
      { id: 'lastName', label: '성', placeholder: '한', type: 'text' },
      { id: 'firstName', label: '이름', placeholder: '수정', type: 'text' },
      {
        id: 'registrationNumber',
        label: '외국인 등록 번호',
        placeholder: '020919',
        type: 'text',
      },
      {
        id: 'registrationNumberSuffix',
        label: '',
        placeholder: '•••••••',
        type: 'password',
      },
      {
        id: 'nationality',
        label: '국적',
        type: 'select',
        options: [
          { value: 'KINGDOM OF CAMBODIA', label: 'KINGDOM OF CAMBODIA' },
          {
            value: "PEOPLE'S REPUBLIC OF BANGLADESH",
            label: "PEOPLE'S REPUBLIC OF BANGLADESH",
          },
          {
            value: "PEOPLE'S REPUBLIC OF CHINA",
            label: "PEOPLE'S REPUBLIC OF CHINA",
          },
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
          {
            value: 'UNITED STATES OF AMERICA',
            label: 'UNITED STATES OF AMERICA',
          },
        ],
      },
      {
        id: 'residenceType',
        label: '체류자격',
        placeholder: 'D-8',
        type: 'text',
      },
      { id: 'issueDate', label: '발급일자', type: 'date' },
    ],
  },
  account: {
    title: '출입계좌 선택',
    fields: [],
  },
};

export function IdentityFormDrawer({
  type,
  open,
  onOpenChange,
  onSubmit,
  className,
}: IdentityFormDrawerProps) {
  const config = formConfig[type];
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    onSubmit?.(formData);
    onOpenChange(false);
  };

  const handleReset = () => {
    setFormData({});
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className={className || 'mx-auto max-w-md'}>
        <DrawerHeader className="relative border-b">
          <DrawerTitle className="text-center font-semibold text-base">
            {config.title}
          </DrawerTitle>
          <DrawerClose className="absolute top-4 right-4">
            <X className="h-5 w-5" />
          </DrawerClose>
        </DrawerHeader>

        <div className="max-h-[60vh] space-y-6 overflow-y-auto p-6">
          {type === 'account' ? (
            <div className="space-y-3">
              <AccountOption
                name="영업나블러스 통장"
                accountNumber="211-910776-38107"
              />
              <AccountOption name="자유예금" accountNumber="506-910017-92907" />
            </div>
          ) : (
            <>
              {/* 성과 이름 */}
              <div className="flex gap-8.25">
                <div className="flex-1 space-y-2">
                  <Label className="font-normal text-gray-600 text-sm">
                    성
                  </Label>
                  <Input
                    type="text"
                    placeholder="한"
                    value={formData.lastName || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="h-12 border-0 bg-gray-50"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label className="font-normal text-gray-600 text-sm">
                    이름
                  </Label>
                  <Input
                    type="text"
                    placeholder="수정"
                    value={formData.firstName || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="h-12 border-0 bg-gray-50"
                  />
                </div>
              </div>

              {/* 여권번호와 성별 (passport only) */}
              {type === 'passport' && (
                <div className="flex gap-8.25">
                  <div className="flex-1 space-y-2">
                    <Label className="font-normal text-gray-600 text-sm">
                      여권번호
                    </Label>
                    <Input
                      type="text"
                      placeholder="M12345678"
                      value={formData.passportNumber || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          passportNumber: e.target.value,
                        })
                      }
                      className="h-12 border-0 bg-gray-50"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label className="font-normal text-gray-600 text-sm">
                      성별
                    </Label>
                    <Select
                      value={formData.gender || ''}
                      onValueChange={(value) =>
                        setFormData({ ...formData, gender: value })
                      }
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
              )}

              {/* 외국인 등록번호 (alien-registration only) */}
              {type === 'alien-registration' && (
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
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          registrationNumber: e.target.value,
                        })
                      }
                      className="h-12 flex-1 border-0 bg-gray-50"
                    />
                    <span className="px-2 text-gray-600">-</span>
                    <Input
                      type="password"
                      placeholder="•••••••"
                      maxLength={7}
                      value={formData.registrationNumberSuffix || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          registrationNumberSuffix: e.target.value,
                        })
                      }
                      className="h-12 flex-1 border-0 bg-gray-50"
                    />
                  </div>
                </div>
              )}

              {/* 나머지 필드 */}
              {config.fields
                .filter(
                  (field) =>
                    field.id !== 'lastName' &&
                    field.id !== 'firstName' &&
                    field.id !== 'passportNumber' &&
                    field.id !== 'gender' &&
                    field.id !== 'registrationNumber' &&
                    field.id !== 'registrationNumberSuffix',
                )
                .map((field) => (
                  <div key={field.id} className="space-y-2">
                    {field.label && (
                      <Label
                        htmlFor={field.id}
                        className="font-normal text-gray-600 text-sm"
                      >
                        {field.label}
                      </Label>
                    )}
                    {field.type === 'date' ? (
                      <DatePicker
                        value={formData[field.id]}
                        onChange={(date) =>
                          setFormData({ ...formData, [field.id]: date })
                        }
                      />
                    ) : field.type === 'select' ? (
                      <Select
                        value={formData[field.id] || ''}
                        onValueChange={(value) =>
                          setFormData({ ...formData, [field.id]: value })
                        }
                      >
                        <SelectTrigger className="flex h-12 min-h-12 w-full items-center border-0 bg-gray-50">
                          <SelectValue placeholder="선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.id] || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [field.id]: e.target.value,
                          })
                        }
                        className="h-12 border-0 bg-gray-50"
                      />
                    )}
                  </div>
                ))}
            </>
          )}
        </div>

        <div className="flex gap-3 border-t p-4">
          <Button
            variant="outline"
            className="h-12 flex-1 border-hana-green text-hana-green hover:bg-green-50"
            onClick={handleReset}
          >
            재촬영
          </Button>
          <Button
            className="h-12 flex-1 bg-hana-green text-white hover:bg-green-700"
            onClick={handleSubmit}
          >
            확인
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function DatePicker({
  value,
  onChange,
}: {
  value?: string;
  onChange: (date: string) => void;
}) {
  const [date, setDate] = useState<Date>(
    value ? new Date(value) : undefined
  );

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

function AccountOption({
  name,
  accountNumber,
}: {
  name: string;
  accountNumber: string;
}) {
  return (
    <button
      type="button"
      className="w-full rounded-lg border p-4 text-left transition-colors hover:border-hana-green hover:bg-green-50"
    >
      <div className="flex items-center gap-2">
        <Star
          className="h-4 w-4 fill-hana-green text-hana-green"
          strokeWidth={0.1}
        />
        <div>
          <div className="text-sm">{name}</div>
          <div className="text-gray-500 text-xs">{accountNumber}</div>
        </div>
      </div>
    </button>
  );
}
