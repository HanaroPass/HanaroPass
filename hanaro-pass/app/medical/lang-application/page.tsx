'use client';

import Header from '@/components/header/Header';
import DescriptionSection from '../components/DescriptionSection';
import HospitalItem from '../components/HospitalItem';
import SearchInput from '../components/SearchInput';

export default function HospitalLanguageApplicationPage() {
  const dummyHospitals = [
    { id: 1, name: '서울국제의료센터', address: '서울시 강남구 테헤란로 123' },
    { id: 2, name: '강남병원', address: '서울시 강남구 역삼로 456' },
  ];

  const handleHospitalSelect = (id: number) => {
    console.log(`병원 ID ${id} 선택됨`);
  };
  return (
    <div className="app-shell bg-white shadow-lg">
      <div className="app-layout">
        <Header title="병원 관리자 등록" leftType="back" />
        <main className="app-main flex flex-col">
          <DescriptionSection
            title="병원 등록"
            descriptions={[
              '이미 지도에 등록된 병원을 검색해',
              '외국어 진료 가능 여부를 추가로 등록해주세요',
            ]}
          />

          {/* QQQ: 나중에 채혀니가 만들면 바꿀 예정 */}
          <SearchInput />

          <div className="flex-1 px-6 py-6">
            <h3 className="mb-4 font-bold text-black-900 text-sm">
              검색된 병원 정보
            </h3>

            {dummyHospitals.length === 0 ? (
              /* [화면 1]의 '결과 없음' UI를 직접 구현 */
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
                    // QQQ : 나중에 클릭하면 {hospitalId}로 이동하도록
                    onSelect={() => handleHospitalSelect(hospital.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
