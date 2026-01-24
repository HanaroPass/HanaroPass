'use client';

import {
  Bookmark,
  CircleDollarSign,
  Cross,
  Landmark,
  LocateFixed,
  Siren,
} from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
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
import { type LocationInfo, PlaceCard } from './components/ui/PlaceCard';
import { ToggleButton } from './components/ui/ToggleButton';
import { useBottomSheet } from './hooks/useBottomSheet';
import { type Embassy, MAP_EMBASSY_MOCK } from './mock/embassyExchange';
import {
  HOSPITALS_MAP_MOCK,
  type HospitalPlace,
} from './mock/hospitalMap.mock';
import { SAVED_PLACES_MOCK, type SavedPlace } from './mock/savedPlaces';

/**
 * @page MapPage
 * @description 지도 기반 서비스의 메인 페이지입니다.
 * Naver Map을 배경으로 깔고, 상단 카테고리 탭과 우측 퀵 버튼, 하단 바텀시트를 조합합니다.
 * useBottomSheet 커스텀 훅을 사용하여 시트 관련 모든 로직을 주입받아 사용합니다.
 */

// 카테고리 변환 맵
const CATEGORY_MAP: Record<string, string> = {
  CAFE: '카페',
  FOOD: '식당',
  SHOP: '쇼핑',
};

type NaverLocalSearchItem = {
  title: string;
  link: string;
  category: string;
  description: string;
  telephone: string;
  address: string;
  roadAddress: string;
  mapx: string;
  mapy: string;
};

export default function MapPage() {
  const [exchangeResults, setExchangeResults] = useState<NaverSearchResult[]>(
    [],
  );
  const [bookmark, setBookmark] = useState<boolean>(false);
  const [selectedPlace, setSelectedPlace] = useState<
    SavedPlace | Embassy | NaverSearchResult | null
  >(null);
  const [selectedHospital, setSelectedHospital] =
    useState<HospitalPlace | null>(null);
  const [currentMapRegion, setCurrentMapRegion] = useState<string>('');

  const mapControlRef = useRef<NaverMapHandle>(null);
  const lastSearchedRegionRef = useRef<string>('');

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

  const formatExchangeData = (results: NaverSearchResult[]): LocationInfo[] => {
    return results.map((item) => ({
      id: Number(item.mapx),
      name: item.title.replace(/<[^>]*>?/g, ''),
      type: '환전소',
      address: item.roadAddress || item.address || '',
      phone: item.telephone || '',
      distance: '',
      status: '',
      explainTime: '',
    }));
  };

  const mapDbToInfo = (
    db: SavedPlace | Embassy | NaverSearchResult,
  ): LocationInfo => {
    if ('mapx' in db) {
      return {
        id: Number(db.mapx),
        name: db.title.replace(/<[^>]*>?/g, ''),
        type: '환전소',
        address: db.roadAddress || db.address || '',
        phone: db.telephone || '',
        distance: '',
        status: '',
        explainTime: '',
      };
    }
    const { address, phone } = db;
    const type =
      'category' in db ? CATEGORY_MAP[db.category] || '기타' : '대사관, 영사관';
    return {
      id: db.id,
      name: db.placeName,
      type,
      address,
      phone,
      explainTime: db.openHours,
      distance: '',
    };
  };

  const handleExchangeClick = useCallback(async () => {
    // 환전소 시트가 열려있는데 버튼 누르면 닫히게
    if (openSheet === 'exchange') {
      toggleSheet('exchange');
      setSelectedPlace(null);
      return;
    }

    // 버튼을 누른 시점에 "현재 지도 위치"와 "마지막 검색 위치" 비교
    const isSameRegion = lastSearchedRegionRef.current === currentMapRegion;

    // 데이터 이미 있고 동네 안 바뀌었으면 검색 없이 시트만 열기
    if (exchangeResults.length > 0 && isSameRegion) {
      toggleSheet('exchange');
      return;
    }

    // 동네가 바뀌었거나 데이터가 없으면 새로 검색 시작
    try {
      setExchangeResults([]); // 기존 핀 지우기
      setSelectedPlace(null);
      lastSearchedRegionRef.current = currentMapRegion; // 현재 지역을 검색 지역으로

      const regions = currentMapRegion.split(' ');
      const guName = regions[0] || '';
      const dongName = regions[1] || '';
      const keywords = ['환전', '환전소', '머니박스', '무인환전'];

      let allRawItems: NaverLocalSearchItem[] = [];

      for (const word of keywords) {
        const queries = [
          { q: `${guName} ${dongName} ${word}`, start: 1 },
          { q: `${guName} ${guName} ${word}`, start: 1 },
        ];
        const pageRequests = queries.map(({ q, start }) =>
          fetch(
            `/map/api/search?q=${encodeURIComponent(q)}&display=20&start=${start}`,
          )
            .then((res) => res.json())
            .then((data) => data.items || [])
            .catch(() => []),
        );
        const results = await Promise.all(pageRequests);
        allRawItems = [...allRawItems, ...results.flat()];
      }

      const itemMap = new Map<string, NaverSearchResult>();
      allRawItems.forEach((item) => {
        if (!item.mapx || !item.mapy) return;
        const coordinateKey = `${item.mapx}-${item.mapy}`;
        if (!itemMap.has(coordinateKey)) {
          itemMap.set(coordinateKey, {
            title: item.title.replace(/<[^>]*>?/g, '').trim(),
            roadAddress: item.roadAddress,
            telephone: item.telephone,
            category: item.category,
            mapx: item.mapx,
            mapy: item.mapy,
          });
        }
      });

      setExchangeResults(Array.from(itemMap.values()));
    } catch (error) {
      console.error('Exchange search failed:', error);
    }
    toggleSheet('exchange');
  }, [openSheet, toggleSheet, exchangeResults.length, currentMapRegion]);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-gray-100">
      {/* 맵 레이어 */}
      <div className="absolute inset-0 z-0">
        <NaverMap
          ref={mapControlRef}
          onMapMoved={setCurrentMapRegion}
          activeCategory={openSheet === 'hospital' ? 'hospital' : null}
          hospitals={HOSPITALS_MAP_MOCK}
          savedPlaces={SAVED_PLACES_MOCK}
          showBookmarks={bookmark}
          onMarkerClick={(place) => {
            // 병원
            if ('departments' in place) {
              const target = place as HospitalPlace;
              if (selectedHospital?.id === target.id) {
                setSelectedHospital(null);
                toggleSheet('hospital');
              } else {
                setSelectedHospital(target);
                setSelectedPlace(null);
                toggleSheet('hospital', true);
              }
              return;
            }

            // 대사관
            if ('nationality' in place) return;

            // 환전소
            if ('mapx' in place && 'title' in place) {
              const target = place as NaverSearchResult;
              const isSame =
                selectedPlace &&
                'mapx' in selectedPlace &&
                selectedPlace.mapx === target.mapx;
              if (isSame) {
                toggleSheet('exchange');
              } else {
                setSelectedPlace(target);
                setSelectedHospital(null);
                toggleSheet('exchange', true);
              }
              return;
            }

            // 즐겨찾기 장소인 경우
            if ('placeName' in place) {
              const target = place as SavedPlace;
              const isSame =
                selectedPlace &&
                'id' in selectedPlace &&
                selectedPlace.id === target.id;
              if (isSame) {
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
          exchangeResults={exchangeResults}
          showExchanges={openSheet === 'exchange'}
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
          onClick={handleExchangeClick}
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
            hospital={selectedHospital ?? undefined}
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
        {openSheet === 'embassy' && <EmbassyContent />}
      </MapBottomSheet>
    </main>
  );
}
