import Header from '@/components/header/Header';
import DescriptionSection from '../components/DescriptionSection';

export default function HospitalLanguageApplicationPage() {
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
        </main>
      </div>
    </div>
  );
}
