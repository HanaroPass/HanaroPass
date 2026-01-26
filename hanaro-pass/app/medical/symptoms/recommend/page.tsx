'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { HospitalCard } from '@/app/map/components/hospital/HospitalCard';
import type { Hospital } from '@/lib/generated/prisma';
import { useMyLocation } from '@/lib/getMyLocation';
import { cn } from '@/lib/utils';
import getDistance from '../../../../lib/getDistance';
import { getFilteredHospitals } from '../../actions/filterHospital';
import { parseOutput } from '../../actions/symptoms';
import Symptom from '../../components/symptom/Symptom';

export type HospitalWithStatus = Omit<Hospital, 'latitude' | 'longitude'> & {
  latitude: number;
  longitude: number;
  openTime: string;
  closeTime: string;
  status: '진료 중' | '진료 종료';
  deptName: string;
  langName: string;
  aiSummary: string | null;
  distance?: number;
};

export default function SymptomRecommendPage() {
  //TODO: 유저 연동
  const nickname = 'chan';

  const [symptom, setSymptom] = useState<string[] | undefined>(undefined);
  const [sortByDistance, setSortByDistance] = useState(false);
  const [isOpened, setOpened] = useState(false);
  const { location } = useMyLocation();

  const [type, setType] = useState<'SYMPTOM' | 'PROCEDURE'>('SYMPTOM');
  const [hospitals, setHospitals] = useState<HospitalWithStatus[]>([]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const parseAndFilter = async () => {
      const data = localStorage.getItem('symptom-result');
      if (data) {
        const result = await parseOutput(data);
        if (result?.주요_증상 || result?.발생_시점) {
          setSymptom(result?.주요_증상);
          setType('SYMPTOM');
        } else {
          setSymptom(result?.희망_시술);
          setType('PROCEDURE');
        }
      }

      const hospitals = await getFilteredHospitals(type, symptom);
      const refinedHospitals = hospitals.map((h) => ({
        ...h,
        deptName: h.HospitalDept.map((d) => d.deptName).join(', '),
        langName: h.HospitalLang.map((l) => l.langName).join(', '),
        aiSummary: h.HospitalReview?.aiSummary ?? null,
        ...filterHour(h.openHours),
      }));
      setHospitals(refinedHospitals);
      console.log(hospitals);
    };
    parseAndFilter();
  }, []);

  // 영업시간 필터링
  const filterHour = useCallback((openHours: string) => {
    const [openTime, closeTime] = openHours.split(' - ');
    const [openH, openM] = openTime.split(':').map(Number);
    const [closeH, closeM] = closeTime.split(':').map(Number);
    const now = new Date();

    const openDate = new Date();
    openDate.setHours(openH, openM, 0, 0);

    const closeDate = new Date();
    closeDate.setHours(closeH, closeM, 0, 0);

    const status: '진료 중' | '진료 종료' =
      now < openDate || now > closeDate ? '진료 종료' : '진료 중';
    console.log(openTime, closeTime, status);
    return { openTime, closeTime, status };
  }, []);

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

  const toggleBase = 'justify-center rounded-4xl border-2 px-3 py-1';
  const unChecked = 'border-transparent bg-green-ez text-white';
  const checked = 'border-green-ez text-green-ez';

  return (
    <div>
      <div className="space-y-4 px-4 py-6">
        <h2 className="font-semibold text-lg">{nickname} 손님의 맞춤형 병원</h2>
        <p className="text-gray-500 text-sm">
          외국인 진료가 가능한 병원이에요.
        </p>
        <div className="h-24 rounded-2xl bg-gray-200">
          <div className="ml-6 pt-5 text-black-800 text-sm">
            {nickname} 손님의 맞춤형 병원
          </div>
          <div className="mt-2 mb-5 ml-6">
            {symptom?.map((symptom) => (
              <span key={symptom}>
                <Symptom value={symptom} />
              </span>
            ))}
          </div>
        </div>
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
          {sortedHospitals.map((hospital, idx) => {
            console.log(hospital);
            return (
              <div
                key={hospital.id}
                className={
                  idx === sortedHospitals.length - 1
                    ? ''
                    : 'border-gray-300 border-b'
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
                    langName: hospital.langName,
                    deptName: hospital.deptName,
                    aiSummary: hospital.aiSummary ?? undefined,
                  }}
                />
              </div>
            );
          })}
          {sortedHospitals.length === 0 && (
            <div className="py-10 text-center text-gray-400 text-sm">
              조건에 맞는 병원이 없어요
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
