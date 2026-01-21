// app/medical/page.tsx
'use client';

import HospitalItem from '../components/HospitalItem';
import SearchInput from '../components/SearchInput';

export default function MedicalPage() {
  // 상태 관리 (나중에 hooks로 분리 예정)
  const dummyHospitals = [
    { id: 1, name: '서울국제의료센터', address: '서울시 강남구 테헤란로 123' },
    { id: 2, name: '강남병원', address: '서울시 강남구 역삼로 456' },
  ];

  const handleHospitalSelect = (id: number) => {
    console.log(`병원 ID ${id} 선택됨`);
  };

  return (
    <div className="flex h-full flex-col">
      {/* 1. 검색 입력 (상태에 따라 변함) */}
      <SearchInput />

      {/* 2. 병원 리스트 (데이터 유무에 따라 변함) */}
      <div className="px-6 py-6">
        <h3 className="mb-4 font-bold text-black-900 text-sm">
          검색된 병원 정보
        </h3>

        {dummyHospitals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <p className="font-medium font-sans text-base text-black-600">
              검색 결과가 없습니다
            </p>
            <p className="mt-2 font-sans text-black-400 text-sm">
              병원명이나 주소를 다시 확인해주세요
            </p>
          </div>
        ) : (
          <div className="space-y-4 pb-6">
            {dummyHospitals.map((hospital) => (
              <HospitalItem
                key={hospital.id}
                name={hospital.name}
                address={hospital.address}
                onSelect={() => handleHospitalSelect(hospital.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
