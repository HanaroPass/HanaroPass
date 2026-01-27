'use client';

import {
  Bookmark,
  CircleDollarSign,
  Cross,
  Landmark,
  LocateFixed,
  Siren,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Embassy, SavedPlace } from '@/lib/generated/prisma';
import { getMyEmbassy } from './actions/embassy';
import { getSavedPlaces } from './actions/savedPlaces';
import { EmbassyContent } from './components/embassy/EmbassyContent';
import { ExchangeContent } from './components/exchange/ExchangeContent';
import { HospitalContent } from './components/hospital/HospitalContent';
import { SirenContent } from './components/siren/SirenContent';
import { MapBottomSheet } from './components/ui/MapBottomSheet';
import {
  NaverMap,
  type NaverMapHandle,
  type NaverSearchResult,
} from './components/ui/NaverMap';
import { PlaceCard } from './components/ui/PlaceCard';
import { ToggleButton } from './components/ui/ToggleButton';
import { useBottomSheet } from './hooks/useBottomSheet';
import { useExchangeSearch } from './hooks/useExchangeSearch';
import { useMarkerClick } from './hooks/useMarkerClick';
import { formatExchangeData, mapDbToInfo } from './utils/mapUtils';

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
  imageUrl?: string | null;
  aiSummary?: string;
};

type Props = {
  hospitals: Hospital[];
  userId: number | null;
};

export default function MapPageClient({ hospitals, userId }: Props) {
  const [bookmark, setBookmark] = useState(false);

  const [savedPlaces, setSavedPlaces] = useState<SavedPlace[]>([]);
  const [myEmbassy, setMyEmbassy] = useState<Embassy | null>(null);

  const [selectedPlace, setSelectedPlace] = useState<
    SavedPlace | Embassy | NaverSearchResult | null
  >(null);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(
    null,
  );
  const [currentMapRegion, setCurrentMapRegion] = useState('');

  const mapControlRef = useRef<NaverMapHandle>(null);

  const { exchangeResults, searchExchanges } =
    useExchangeSearch(currentMapRegion);

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

  useEffect(() => {
    if (!userId) return;

    const fetchEmbassy = async () => {
      try {
        const result = await getMyEmbassy(userId);

        if (result.success) {
          setMyEmbassy(result.data);
        } else {
          console.error('대사관 조회 실패:', result.message);
        }
      } catch (e) {
        console.error('네트워크 오류:', e);
      }
    };

    fetchEmbassy();
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    const fetchPlaces = async () => {
      try {
        const result = await getSavedPlaces(userId);

        if (result.success) {
          setSavedPlaces(result.data);
        } else {
          console.error('저장된 장소 불러오기 실패:', result.message);
        }
      } catch (e) {
        console.error('네트워크 오류:', e);
      }
    };

    fetchPlaces();
  }, [userId]);

  useEffect(() => {
    if (!currentMapRegion) return;
  }, [currentMapRegion]);

  const handleExchangeClick = useCallback(async () => {
    if (openSheet === 'exchange') {
      toggleSheet('exchange');
      setSelectedPlace(null);
      return;
    }
    await searchExchanges();
    toggleSheet('exchange');
  }, [openSheet, toggleSheet, searchExchanges]);

  const { handleMarkerClick } = useMarkerClick({
    selectedPlace,
    selectedHospital,
    setSelectedPlace,
    setSelectedHospital,
    toggleSheet,
  });

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-gray-100">
      <div className="absolute inset-0 z-0">
        <NaverMap
          ref={mapControlRef}
          onMapMoved={setCurrentMapRegion}
          activeCategory={openSheet === 'hospital' ? 'hospital' : null}
          hospitals={hospitals}
          savedPlaces={savedPlaces}
          showBookmarks={bookmark}
          onMarkerClick={handleMarkerClick}
          embassyData={myEmbassy ? [myEmbassy] : []}
          showEmbassy={openSheet === 'embassy'}
          exchangeResults={exchangeResults}
          showExchanges={openSheet === 'exchange'}
        />
      </div>

      <div className="absolute top-3 left-3 z-10 flex gap-2.5">
        <ToggleButton
          variant="pill"
          label="병원"
          icon={<Cross className="h-4 w-4" />}
          active={openSheet === 'hospital'}
          iconColorVariant="red"
          onClick={() => {
            setSelectedHospital(null);
            toggleSheet('hospital');
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
            if (isOpening && myEmbassy) {
              mapControlRef.current?.panToLocation(
                Number(myEmbassy.latitude),
                Number(myEmbassy.longitude),
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
          onClick={handleExchangeClick}
        />
      </div>

      <div className="absolute top-[15%] right-3 z-10 flex flex-col gap-2.5">
        <ToggleButton
          variant="icon"
          icon={<LocateFixed className="h-5 w-5" />}
          active={false}
          iconColorVariant="gray"
          ariaLabel="내 위치 토글"
          onClick={() => mapControlRef.current?.centerToMyPosition()}
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
        {openSheet === 'bookmark' && !!selectedPlace && (
          <div className="px-2">
            <PlaceCard data={mapDbToInfo(selectedPlace)} />
          </div>
        )}
        {openSheet === 'hospital' && (
          <HospitalContent
            mode={selectedHospital ? 'detail' : 'list'}
            hospitals={hospitals}
            hospital={selectedHospital ?? undefined}
            onBackToList={() => {
              setSelectedHospital(null);
              toggleSheet('hospital', true);
            }}
          />
        )}
        {openSheet === 'siren' && <SirenContent />}
        {openSheet === 'exchange' && (
          <ExchangeContent
            results={formatExchangeData(exchangeResults)}
            selectedPlace={
              selectedPlace && 'mapx' in selectedPlace
                ? mapDbToInfo(selectedPlace)
                : null
            }
            onBackToList={() => {
              setSelectedPlace(null);
              toggleSheet('exchange', true);
            }}
          />
        )}
        {openSheet === 'embassy' && <EmbassyContent data={myEmbassy} />}
      </MapBottomSheet>
    </main>
  );
}
