import { CircleCheck } from 'lucide-react';
import type React from 'react';
import type StatusBadge from '@/app/medical/components/StatusBadge';

type SummaryItem = {
  label: string;
  value: string | React.ReactElement<typeof StatusBadge>;
};

type RegistrationSummaryProps = {
  title: string;
  description: string;
  items: SummaryItem[];
};

export default function RegistrationSummary({
  title,
  description,
  items,
}: RegistrationSummaryProps) {
  return (
    <div className="flex w-full flex-col items-center">
      {/* 1. 상단 아이콘 */}
      <div className="mt-12 mb-8">
        <CircleCheck className="h-20 w-20 text-black-900" strokeWidth={1.2} />
      </div>

      {/* 2. 타이틀 및 설명 문구 */}
      <div className="mb-10 px-6 text-center">
        <h2 className="whitespace-pre-line font-bold text-black-900 text-xl tracking-tight">
          {title}
        </h2>
        <p className="mt-4 whitespace-pre-line font-sans text-base text-black-400 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mx-6 w-[calc(100%-48px)] rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <div
              key={item.label}
              className={`flex items-center justify-between py-4 ${
                !isLast ? 'border-gray-100 border-b' : ''
              }`}
            >
              <p className="font-sans text-base text-black-400">{item.label}</p>
              <div className="font-sans font-semibold text-base text-black-900">
                {item.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
