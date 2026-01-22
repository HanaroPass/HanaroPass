'use client';

import {
  Bookmark,
  CircleDollarSign,
  Cross,
  Landmark,
  LocateFixed,
  Siren,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { EmbassyContent } from './components/embassy/EmbassyContent';
import { ExchangeContent } from './components/exchange/ExchangeContent';
import { HospitalContent } from './components/hospital/HospitalContent';
import { SirenContent } from './components/siren/SirenContent';
import { MapBottomSheet } from './components/ui/MapBottomSheet';
import { NaverMap } from './components/ui/NaverMap';
import { PlaceCard } from './components/ui/PlaceCard';
import { ToggleButton } from './components/ui/ToggleButton';
import { useBottomSheet } from './hooks/useBottomSheet';
import { SAVED_PLACES_MOCK, type SavedPlace } from './mock/savedPlaces';
import {
  HOSPITALS_MAP_MOCK,
  type HospitalPlace,
} from './mock/hospitalMap.mock';

/**
 * @page MapPage
 * @description 지도 기반 서비스의 메인 페이지입니다.
 * Naver Map을 배경으로 깔고, 상단 카테고리 탭과 우측 퀵 버튼, 하단 바텀시트를 조합합니다.
 * useBottomSheet 커스텀 훅을 사용하여 시트 관련 모든 로직을 주입받아 사용합니다.
 */
export default function MapPage() {
  const [bookmark, setBookmark] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<SavedPlace | null>(null);
  const [selectedHospital, setSelectedHospital] =
    useState<HospitalPlace | null>(null);

  const mapControlRef = useRef<{ centerToMyPosition: () => void }>(null);

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
        <NaverMap
          ref={mapControlRef}
          activeCategory={openSheet === 'hospital' ? 'hospital' : null}
          hospitals={HOSPITALS_MAP_MOCK}
          savedPlaces={SAVED_PLACES_MOCK}
          showBookmarks={bookmark}
          onMarkerClick={(place) => {
            if ('departments' in place) {
              setSelectedHospital(place);
              setSelectedPlace(null);
              toggleSheet('hospital', true);
              return;
            }

            const isSame = selectedPlace?.id === place.id;
            if (isSame) {
              setSelectedPlace(null);
              toggleSheet('bookmark');
            } else {
              setSelectedPlace(place);
              toggleSheet('bookmark', true);
            }
          }}
        />
      </div>

      {/* 상단 필터 그룹 */}
      <div className="absolute top-3 left-3 z-10 flex gap-2.5">
        <ToggleButton
          variant="pill"
          label="병원"
          icon={<Cross className="h-4 w-4" />}
          active={openSheet === 'hospital'}
          iconColorVariant="red"
          onClick={() => {
            setSelectedHospital(null);
            toggleSheet('hospital', true);
          }}
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
      <div className="absolute top-[15%] right-3 z-10 flex flex-col gap-2.5">
        <ToggleButton
          variant="icon"
          icon={<LocateFixed className="h-5 w-5" />}
          active={false}
          iconColorVariant="gray"
          ariaLabel="내 위치 토글"
          onClick={() => {
            mapControlRef.current?.centerToMyPosition();
          }}
        />
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

      {/* 바텀시트 */}
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
        {openSheet === 'bookmark' && selectedPlace && (
          <div className="px-6 py-4">
            <PlaceCard
              data={{
                name: selectedPlace.placeName,
                type: selectedPlace.category,
                address: selectedPlace.address,
                phone: selectedPlace.phone,
                distance: '',
                imageUrl: '',
                status: '',
                explainTime: selectedPlace.openHours,
              }}
            />
          </div>
        )}

        {openSheet === 'hospital' && (
          <HospitalContent
            mode={selectedHospital ? 'detail' : 'list'}
            hospital={selectedHospital ?? undefined}
          />
        )}

        {openSheet === 'siren' && <SirenContent />}
        {openSheet === 'exchange' && <ExchangeContent />}
        {openSheet === 'embassy' && <EmbassyContent />}
      </MapBottomSheet>
    </main>
  );
}
