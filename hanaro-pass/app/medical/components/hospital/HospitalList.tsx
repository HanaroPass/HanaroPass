'use client';

import { useMemo, useState } from 'react';
import { HospitalCard } from '@/components/ui/HospitalCard';
import getDistance from '@/lib/getDistance';
import { useMyLocation } from '@/lib/getMyLocation';
import { cn } from '@/lib/utils';
import type { HospitalWithStatus } from '../../symptoms/types';

interface Props {
  hospitals: HospitalWithStatus[];
}

export default function HospitalList({ hospitals }: Props) {
  const [sortByDistance, setSortByDistance] = useState(false);
  const [isOpened, setOpened] = useState(false);
  const { location } = useMyLocation();

  const sortedHospitals = useMemo(() => {
    let updated = [...hospitals];

    if (isOpened) {
      updated = updated.filter((h) => h.status === '진료 중');
    }

    if (sortByDistance && location) {
      updated = updated
        .map((hospital) => ({
          ...hospital,
          distance: getDistance(
            location.lat,
            location.lng,
            hospital.latitude,
            hospital.longitude,
          ),
        }))
        .sort((a, b) => a.distance - b.distance);
    }

    return updated;
  }, [hospitals, sortByDistance, isOpened, location]);

  const toggleBase =
    'rounded-full px-5 py-2 text-sm font-medium border transition';
  const checked = 'bg-white border-gray-300 text-gray-700';
  const unChecked = 'bg-green-ez border-green-ez text-white';

  return (
    <div>
      <div className="mt-6 flex gap-2 text-center font-medium">
        <button
          disabled={!location}
          onClick={() => setSortByDistance((v) => !v)}
          className={cn(
            toggleBase,
            sortByDistance ? unChecked : checked,
            !location && 'cursor-not-allowed opacity-50',
          )}
        >
          {location ? '거리순' : '로딩중'}
        </button>
        <button
          onClick={() => setOpened((v) => !v)}
          className={cn(toggleBase, isOpened ? unChecked : checked)}
        >
          현재 진료 가능 병원
        </button>
      </div>

      {sortedHospitals.map((hospital, idx) => (
        <div
          key={hospital.id}
          className={
            idx === sortedHospitals.length - 1 ? '' : 'border-gray-300 border-b'
          }
        >
          <HospitalCard
            hospital={{
              name: hospital.nameKo,
              status: hospital.status,
              openTime: hospital.openTime,
              closeTime: hospital.closeTime,
              address: hospital.address,
              phone: hospital.phone ?? '',
              languages: hospital.languages,
              departments: hospital.departments,
              aiSummary: hospital.aiSummary ?? undefined,
            }}
          />
        </div>
      ))}

      {sortedHospitals.length === 0 && (
        <div className="py-10 text-center text-gray-400 text-sm">
          조건에 맞는 병원이 없어요
        </div>
      )}
    </div>
  );
}
