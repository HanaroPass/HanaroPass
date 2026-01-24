'use client';

import {
  Bookmark,
  CircleDollarSign,
  Cross,
  Landmark,
  LocateFixed,
  Siren,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { EmbassyContent } from './components/embassy/EmbassyContent';
import { ExchangeContent } from './components/exchange/ExchangeContent';
import { HospitalContent } from './components/hospital/HospitalContent';
import { SirenContent } from './components/siren/SirenContent';
import { MapBottomSheet } from './components/ui/MapBottomSheet';
import { NaverMap, type NaverMapHandle } from './components/ui/NaverMap';
import { type LocationInfo, PlaceCard } from './components/ui/PlaceCard';
import { ToggleButton } from './components/ui/ToggleButton';
import { useBottomSheet } from './hooks/useBottomSheet';
import {
  type Embassy,
  MAP_EMBASSY_MOCK,
  MAP_EXCHANGE_MOCK,
} from './mock/embassyExchange';
import { getHospitals } from './actions/hospitals';
import { SAVED_PLACES_MOCK, type SavedPlace } from './mock/savedPlaces';

/**
 * @page MapPage
 * @description 지도 기반 서비스의 메인 페이지입니다.
 * Naver Map을 배경으로 깔고, 상단 카테고리 탭과 우측 퀵 버튼, 하단 바텀시트를 조합합니다.
 * useBottomSheet 커스텀 훅을 사용하여 시트 관련 모든 로직을 주입받아 사용합니다.
 */

export type Hospital = {
  id: number;
  nameKo: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string | null;
  openHours: string;
  languages: string[];
  departments: string[];
  aiSummary?: string;
};

// 카테고리 변환 맵
const CATEGORY_MAP: Record<string, string> = {
  CAFE: '카페',
  FOOD: '식당',
  SHOP: '쇼핑',
};

export default function MapPage() {
  const [bookmark, setBookmark] = useState<boolean>(false);
  const [selectedPlace, setSelectedPlace] = useState<
    SavedPlace | Embassy | null
  >(null);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(
    null,
  );
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  useEffect(() => {
    const loadHospitals = async () => {
      const data = await getHospitals();
      setHospitals(data);
    };

    loadHospitals();
  }, []);

  const mapControlRef = useRef<NaverMapHandle>(null);

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

  const mapDbToInfo = (db: SavedPlace | Embassy): LocationInfo => {
    const { address, phone } = db;

    if ('category' in db) {
      return {
        id: db.id,
        name: db.placeName,
        type: CATEGORY_MAP[db.category] || '기타',
        address,
        phone,
        explainTime: db.openHours,
        distance: '',
      };
    } else {
      return {
        id: db.id,
        name: db.placeName,
        type: '대사관, 영사관',
        address,
        phone,
        explainTime: db.openHours,
        distance: '',
      };
    }
  };
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-gray-100">
      {/* 맵 레이어 */}
      <div className="absolute inset-0 z-0">
        <NaverMap
          ref={mapControlRef}
          activeCategory={openSheet === 'hospital' ? 'hospital' : null}
          hospitals={hospitals}
          savedPlaces={SAVED_PLACES_MOCK}
          showBookmarks={bookmark}
          onMarkerClick={(place) => {
            // 병원
            if ('departments' in place) {
              setSelectedHospital(place as Hospital);
              setSelectedPlace(null);
              toggleSheet('hospital', true);
              return;
            }

            // 대사관
            if ('nationality' in place) return;

            // 즐겨찾기 장소인 경우
            if ('placeName' in place) {
              const target = place as SavedPlace;
              const isTargetAlreadySelected = selectedPlace?.id === target.id;

              if (isTargetAlreadySelected) {
                // 이미 선택된 걸 또 누르면 닫기
                setSelectedPlace(null);
                toggleSheet('bookmark');
              } else {
                // 새로운 걸 누르면 데이터 교체 후 열기/갱신
                setSelectedPlace(target);
                setSelectedHospital(null);
                toggleSheet('bookmark', true);
              }
            }
          }}
          embassyData={MAP_EMBASSY_MOCK}
          showEmbassy={openSheet === 'embassy'}
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
          onClick={() => {
            const isOpening = openSheet !== 'embassy';
            toggleSheet('embassy');

            if (isOpening) {
              mapControlRef.current?.panToLocation(
                MAP_EMBASSY_MOCK.latitude,
                MAP_EMBASSY_MOCK.longitude,
              );
            }
          }}
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
          <div className="px-2">
            <PlaceCard data={mapDbToInfo(selectedPlace)} />
          </div>
        )}

        {openSheet === 'hospital' && (
          <HospitalContent
            mode={selectedHospital ? 'detail' : 'list'}
            hospitals={hospitals}
            hospital={selectedHospital ?? undefined}
          />
        )}

        {openSheet === 'siren' && <SirenContent />}
        {openSheet === 'exchange' && (
          <ExchangeContent results={MAP_EXCHANGE_MOCK} />
        )}
        {openSheet === 'embassy' && <EmbassyContent />}
      </MapBottomSheet>
    </main>
  );
}
