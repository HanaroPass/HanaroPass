'use client';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

export default function SymptomRadioGroup() {
  const [selectedType, setSelectedType] = useState<string>('');

  return (
    <RadioGroup
      name="type"
      className="flex"
      onValueChange={setSelectedType}
    >
      <Label
        htmlFor="증상"
        className={cn(
          'flex h-16 w-40 items-center space-x-2 rounded-2xl border p-3',
          selectedType === 'SYMPTOM'
            ? 'border-green-ez bg-green-300'
            : 'border-gray-100',
        )}
      >
        <RadioGroupItem value="SYMPTOM" id="증상" className="" />
        <span>증상</span>
      </Label>
      <Label
        htmlFor="시술"
        className={cn(
          'flex h-16 w-40 items-center space-x-2 rounded-2xl border p-3',
          selectedType === 'PROCEDURE'
            ? 'border-green-ez bg-green-300'
            : 'border-gray-100',
        )}
      >
        <RadioGroupItem value="PROCEDURE" id="시술" />
        <span>시술</span>
      </Label>
    </RadioGroup>
  );
}
