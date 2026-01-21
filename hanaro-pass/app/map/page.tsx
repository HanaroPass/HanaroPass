'use client';

import {
  Bookmark,
  CircleDollarSign,
  Cross,
  Landmark,
  Siren,
} from 'lucide-react';
import { useState } from 'react';
import { ExchangeContent } from './components/ExchangeContent';
import { MapBottomSheet } from './components/MapBottomSheet';
import { NaverMap } from './components/NaverMap';
import { SirenContent } from './components/SirenContent';
import { ToggleButton } from './components/ToggleButton';
import { useBottomSheet } from './hooks/useBottomSheet';

/**
 * @page MapPage
 * @description 지도 기반 서비스의 메인 페이지입니다.
 * Naver Map을 배경으로 깔고, 상단 카테고리 탭과 우측 퀵 버튼, 하단 바텀시트를 조합합니다.
 * useBottomSheet 커스텀 훅을 사용하여 시트 관련 모든 로직을 주입받아 사용합니다.
 */
export default function MapPage() {
  const [bookmark, setBookmark] = useState<boolean>(false);

  // 시트 관련 로직과 상태를 커스텀 훅에서 추출
  const {
    openSheet,
    sheetPosition,
    sheetRef,
    contentRef,
    toggleSheet,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    getTranslateValue,
  } = useBottomSheet();

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-gray-100">
      {/* 맵 레이어 */}
      <div className="absolute inset-0 z-0">
        <NaverMap onMarkerClick={() => {}} />
      </div>

      {/* 필터 그룹 */}
      <div className="absolute top-5 left-5 z-10 flex gap-2.5">
        <ToggleButton
          variant="pill"
          label="병원"
          icon={<Cross className="h-4 w-4" />}
          active={openSheet === 'hospital'}
          iconColorVariant="red"
          onClick={() => toggleSheet('hospital')}
        />
        <ToggleButton
          variant="pill"
          label="대사관"
          icon={<Landmark className="h-4 w-4" />}
          active={openSheet === 'embassy'}
          iconColorVariant="blue"
          onClick={() => toggleSheet('embassy')}
        />
        <ToggleButton
          variant="pill"
          label="환전소"
          icon={<CircleDollarSign className="h-4 w-4" />}
          active={openSheet === 'exchange'}
          iconColorVariant="yellow"
          onClick={() => toggleSheet('exchange')}
        />
      </div>

      {/* 우측 유틸 버튼 그룹 */}
      <div className="absolute top-[15%] right-5 z-10 flex flex-col gap-2.5">
        <ToggleButton
          variant="icon"
          icon={
            <Bookmark
              className="h-5 w-5"
              fill={bookmark ? 'currentColor' : 'none'}
            />
          }
          active={bookmark}
          ariaLabel="저장 토글"
          onClick={() => setBookmark(!bookmark)}
        />
        <ToggleButton
          variant="icon"
          icon={<Siren className="h-5 w-5" />}
          active={openSheet === 'siren'}
          iconColorVariant="red"
          colorVariant="red"
          ariaLabel="긴급 상황 토글"
          onClick={() => toggleSheet('siren')}
        />
      </div>

      {/* 바텀시트 컴포넌트 조합 */}
      <MapBottomSheet
        openSheet={openSheet}
        position={sheetPosition}
        sheetRef={sheetRef}
        contentRef={contentRef}
        getTranslateValue={getTranslateValue}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* 컨텐츠 렌더링 영역 */}
        {openSheet === 'siren' && <SirenContent />}
        {openSheet === 'exchange' && <ExchangeContent />}
        {openSheet === 'hospital' && (
          <div className="py-4 text-gray-600">병원 정보를 확인해요.</div>
        )}
        {openSheet === 'embassy' && (
          <div className="py-4 text-gray-600">대사관 정보를 확인해요.</div>
        )}
      </MapBottomSheet>
    </main>
  );
}
