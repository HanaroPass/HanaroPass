'use client';

import { Calendar, Globe, Hospital } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { STATUS_CONFIG, type StatusType } from '../../constants/statusConfig';

type CardProps = {
  id: number | string;
  name: string;
  status: StatusType;
  langCount: number;
  languages: string[];
  date: string;
};

export function HospitalApplicationCard({
  id,
  name,
  status,
  langCount,
  languages,
  date,
}: CardProps) {
  const router = useRouter();
  const config = STATUS_CONFIG[status];

  const handleCardClick = () => {
    router.push(`/medical/admin/${id}`);
  };

  return (
    <Button
      variant="outline"
      onClick={handleCardClick}
      className={cn(
        'relative flex h-auto w-full flex-col items-stretch justify-start gap-0 p-5 text-left transition-all active:scale-[0.98]',
        'rounded-(--radius-md) border-(--color-border) bg-(--color-white-ez) font-sans shadow-sm',
        'hover:border-hana-green/30 hover:bg-(--color-white-ez) focus-visible:ring-2 focus-visible:ring-hana-green',
      )}
    >
      {/* 1. 상단 영역 (아이콘 + 이름 + 배지) */}
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-[#CBFBF1]">
          <Hospital className="h-7 w-7 text-(--color-hana-green)" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-(--color-black-900)">{name}</h3>
          <div
            className={cn(
              'mt-1.5 flex w-fit items-center gap-1.5 rounded-full px-2.5 py-0.5',
              config.badge.bg,
            )}
          >
            <div className={cn('h-1.5 w-1.5 rounded-full', config.badge.dot)} />
            <span className={cn('font-bold text-[11px]', config.badge.text)}>
              {config.label}
            </span>
          </div>
        </div>
      </div>

      {/* 2. 요약 정보 영역 */}
      <div className="mt-5 flex items-center justify-between text-(--color-black-600)">
        <div className="flex items-center gap-2">
          <Globe className="h-3.5 w-3.5 text-(--color-black-400)" />
          <span>{langCount}개 언어</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-3.5 w-3.5 text-(--color-black-400)" />
          <span className="tabular-nums">{date}</span>
        </div>
      </div>

      {/* 3. 언어 태그 목록 */}
      <div className="mt-4 flex flex-wrap gap-2">
        {languages.map((lang) => (
          <span
            key={lang}
            className="rounded-sm bg-(--color-gray-100) px-2.5 py-1 font-medium text-(--color-black-800) text-[11px]"
          >
            {lang}
          </span>
        ))}
      </div>
    </Button>
  );
}
