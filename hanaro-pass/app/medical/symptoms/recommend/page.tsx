'use client';

import Header from '@/components/header/Header';

export default function SymptomRecommendPage() {
  return (
    <div className="app-layout">
      <Header title="AI 병원 추천" />

      <div className="app-main space-y-4 px-4 py-6">
        <h2 className="font-semibold text-lg">HANA 손님의 맞춤형 병원</h2>

        <p className="text-gray-500 text-sm">
          AI가 증상과 선호도를 바탕으로 병원을 추천했어요.
        </p>

        {/* TODO: 추천 병원 카드 리스트 */}
        <div className="space-y-4">{/* HospitalCard 컴포넌트들 */}</div>
      </div>
    </div>
  );
}
