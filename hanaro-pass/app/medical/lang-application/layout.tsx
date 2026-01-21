import { Info } from 'lucide-react';
import Header from '@/components/header/Header';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import DescriptionSection from '../components/DescriptionSection';

export default function HospitalLanguageApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-shell bg-white shadow-lg">
      <div className="app-layout flex h-full flex-col">
        <Header title="병원 관리자 등록" leftType="back" />
        <main className="app-main flex flex-col">
          <DescriptionSection
            title="병원 등록"
            descriptions={[
              '이미 지도에 등록된 병원을 검색해',
              '외국어 진료 가능 여부를 추가로 등록해주세요',
            ]}
          />

          <div className="flex-1">{children}</div>

          <div className="border-gray-300 border-t px-6 py-6">
            <Alert className="rounded-lg border-none bg-gray-100">
              <Info className="h-4 w-4 stroke-hana-green" />
              <AlertTitle className="font-sans font-semibold text-base text-hana-green">
                {'우리 병원이 검색되지 않나요?'}
              </AlertTitle>
              <AlertDescription className="mt-1 flex flex-col gap-0.3 font-sans text-black-600 text-xs leading-relaxed">
                <span>먼저 지도 서비스에 병원을 등록해주세요.</span>
                <span>등록 후 최대 3일 이내에 검색이 가능해집니다.</span>
              </AlertDescription>
            </Alert>
          </div>
        </main>
      </div>
    </div>
  );
}
