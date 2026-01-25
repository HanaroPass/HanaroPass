'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  HospitalCard,
  type HospitalInfo,
} from '@/app/map/components/hospital/HospitalCard';
import { cn } from '@/lib/utils';
import getDistance from '../../actions/getDistance';
import { parseOutput } from '../../actions/symptoms';
import Symptom from '../../components/symptom/Symptom';
import { hospitalLocations } from '../../mock/recommendHospital';

export default function SymptomRecommendPage() {
  const [symptom, setSymptom] = useState<string[] | undefined>([]);
  const [sortByDistance, setSortByDistance] = useState(false);
  const [isOpened, setOpened] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [type, setType] = useState<'SYMPTOM' | 'PROCEDURE'>('SYMPTOM');

  useEffect(() => {
    const parse = async () => {
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
    };
    parse();
  }, []);

  // 위치 가져오기
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  // TODO: 테이블의 경우 목데이터와 달리 Open Hour 통으로 가져옴. 필터링하기
  // const [hospitals, setHospitals] = useState<Hospital[]>([]);
  // useEffect(() => {
  //   const filterHospital = async () => {
  //     const hospitals = await getFilteredHospitals(type, symptom);
  //     setHospitals(hospitals);
  //   };
  //   filterHospital();
  // }, [type, symptom]);

  // 목데이터
  const [hospitals, setHospitals] = useState<HospitalInfo[]>([]);

  useEffect(() => {
    setHospitals(hospitalLocations);
  }, []);

  const sortedHospitals = useMemo(() => {
    let updated = [...hospitals];

    if (isOpened) {
      updated = updated.filter((h) => h.status === '진료 중');
    }

    if (sortByDistance && userLocation) {
      updated = updated
        .map((hospital) => ({
          ...hospital,
          distance: getDistance(
            userLocation.lat,
            userLocation.lng,
            Number(hospital.latitude),
            Number(hospital.longitude),
          ),
        }))
        .sort((a, b) => a.distance - b.distance);
    }
    return updated;
  }, [hospitals, sortByDistance, isOpened, userLocation]);

  const toggleBase = 'justify-center rounded-4xl border-2 px-3 py-1';
  const unChecked = 'border-transparent bg-green-ez text-white';
  const checked = 'border-green-ez text-green-ez';

  return (
    <div className="">
      <div className="space-y-4 px-4 py-6">
        <h2 className="font-semibold text-lg">HANA 손님의 맞춤형 병원</h2>
        <p className="text-gray-500 text-sm">
          외국인 진료가 가능한 병원이에요.
        </p>
        <div className="h-24 rounded-2xl bg-gray-200">
          <div className="ml-6 pt-5 text-black-800 text-sm">
            HANA 손님의 맞춤형 병원
          </div>
          <div className="mt-2 mb-5 ml-6">
            {symptom?.map((symptom) => (
              <span key={symptom}>
                <Symptom value={symptom} />
              </span>
            ))}
          </div>
        </div>
        <div className="">
          <div className="mt-6 flex gap-2 text-center font-medium">
            <button
              onClick={() => setSortByDistance((v) => !v)}
              className={cn(toggleBase, sortByDistance ? unChecked : checked)}
            >
              거리순
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
              key={hospital.name}
              className={
                idx === sortedHospitals.length - 1
                  ? ''
                  : 'border-gray-300 border-b'
              }
            >
              <HospitalCard hospital={hospital} />
            </div>
          ))}
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
