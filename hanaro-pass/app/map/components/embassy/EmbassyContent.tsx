'use client';

import type { Embassy } from '@/lib/generated/prisma';
import { PlaceCard } from '../ui/PlaceCard';

type EmbassyContentProps = {
  data?: Embassy | null;
};

export function EmbassyContent({ data }: EmbassyContentProps) {
  if (!data) {
    return (
      <div className="flex h-40 items-center justify-center py-10 font-medium text-gray-400 text-sm">
        해당 국가의 대사관 정보를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col px-2">
      <PlaceCard
        data={{
          id: data.id,
          name: data.placeName,
          type: '대사관, 영사관',
          address: data.address,
          phone: data.phone,
          explainTime: data.openHours,
          distance: '',
        }}
      />
      <div className="flex gap-1 px-4 text-[11px] text-gray-400">
        <span className="shrink-0">*</span>
        <div>
          제공된 정보는 공공 데이터를 기반으로 하며, 실제 운영 상황과 다를 수
          있습니다.
          <br />
          방문 전 대사관에 직접 문의하시기 바랍니다.
        </div>
      </div>
    </div>
  );
}
