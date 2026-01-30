'use client';

import { Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SearchInput from '@/components/SearchInput/SearchInput';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import DescriptionSection from '../components/languageRegistration/DescriptionSection';
import HospitalItem from '../components/languageRegistration/HospitalItem';
import { useHospitalSearch } from '../hooks/useHospitalSearch';

export default function MedicalPage() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const { hospitals, isLoading } = useHospitalSearch(searchQuery);

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto">
        <DescriptionSection
          title="병원 등록"
          descriptions={[
            '지도에 등록된 병원을 검색해',
            '외국어 진료 가능 여부를 추가로 등록해주세요',
          ]}
        />
        <div className="mt-4 px-6">
          <SearchInput
            placeholder="병원명을 검색해주세요 (ex: 하나병원)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery('')}
          />
        </div>

        <div className="px-6 py-6">
          <h3 className="mb-4 font-bold text-black-900 text-sm">
            검색된 병원 정보
          </h3>

          {!isLoading && searchQuery.trim() !== '' && hospitals.length === 0 ? (
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
              {hospitals.map((hospital) => (
                <HospitalItem
                  key={hospital.id}
                  name={hospital.nameKo}
                  address={hospital.address}
                  onSelect={() =>
                    router.push(
                      `/medical/registrations/new?hospitalId=${hospital.id}`,
                    )
                  }
                />
              ))}
            </div>
          )}
          <div className="border-gray-300 border-t px-2 py-6">
            <Alert className="rounded-lg border-none bg-gray-100">
              <Info className="h-4 w-4 stroke-hana-green" />
              <AlertTitle className="font-sans font-semibold text-base text-hana-green">
                {'우리 병원이 검색되지 않나요?'}
              </AlertTitle>
              <AlertDescription className="mt-1 flex flex-col gap-0.5 font-sans text-black-600 text-xs leading-relaxed">
                <span>먼저 지도 서비스에 병원을 등록해주세요.</span>
                <span>등록 후 최대 3일 이내에 검색이 가능해집니다.</span>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
}
