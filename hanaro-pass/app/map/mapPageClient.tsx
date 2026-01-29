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
import { type Hospital, useHospitalFilters } from './hooks/useHospitalFilters';
import { useMarkerClick } from './hooks/useMarkerClick';
import type { MapBounds } from './types/map';
import { formatExchangeData, mapDbToInfo } from './utils/mapUtils';

type MapPageClientProps = {
  hospitals: Hospital[];
  initialEmbassy: Embassy | null;
  initialSavedPlaces: SavedPlace[];
};

export default function MapPageClient({
  hospitals,
  initialEmbassy,
  initialSavedPlaces,
}: MapPageClientProps) {
  const [savedPlaces] = useState<SavedPlace[]>(initialSavedPlaces);
  const [myEmbassy] = useState<Embassy | null>(initialEmbassy);
  const [bookmark, setBookmark] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<
    SavedPlace | Embassy | NaverSearchResult | null
  >(null);

  const [currentMapRegion, setCurrentMapRegion] = useState('');
  const mapControlRef = useRef<NaverMapHandle>(null);
  const { exchangeResults, searchExchanges, clearResults } =
    useExchangeSearch(currentMapRegion);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number }>();

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

  const [mapBounds, setMapBounds] = useState<MapBounds | null>(null);

  const { selectedHospital, setSelectedHospital } = useHospitalFilters(
    hospitals,
    mapBounds,
  );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserCoords({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => console.error('위치 정보를 가져올 수 없습니다.', err),
      );
    }
  }, []);

  useEffect(() => {
    if (openSheet !== 'exchange' || !currentMapRegion) return;

    const timer = setTimeout(() => {
      searchExchanges();
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentMapRegion, openSheet, searchExchanges]);

  const handleMapMove = useCallback((address: string, bounds?: MapBounds) => {
    setCurrentMapRegion(address);
    if (bounds) setMapBounds(bounds);
  }, []);

  const handleExchangeClick = useCallback(async () => {
    if (openSheet === 'exchange') {
      clearResults();
      toggleSheet('exchange');
      setSelectedPlace(null);
      return;
    }

    clearResults();
    await searchExchanges(true);
    toggleSheet('exchange');
  }, [openSheet, toggleSheet, searchExchanges, clearResults]);

  const { handleMarkerClick } = useMarkerClick({
    selectedPlace,
    selectedHospital,
    setSelectedPlace,
    setSelectedHospital,
    toggleSheet,
  });

  return (
    <main className="relative h-screen w-full overflow-hidden bg-gray-100">
      <div className="absolute inset-0 z-0">
        <NaverMap
          ref={mapControlRef}
          onMapMoved={handleMapMove}
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
          active={openSheet === 'hospital'}
          icon={
            <Cross className="h-4 w-4" fill="currentColor" strokeWidth={3} />
          }
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
        {openSheet === 'bookmark' && selectedPlace && (
          <div className="px-2">
            <PlaceCard
              data={mapDbToInfo(selectedPlace)}
              userCoords={userCoords}
            />
          </div>
        )}
        {openSheet === 'hospital' && (
          <HospitalContent
            mode={selectedHospital ? 'detail' : 'list'}
            hospitals={hospitals}
            mapBounds={mapBounds}
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
        {openSheet === 'embassy' && (
          <EmbassyContent data={myEmbassy} userCoords={userCoords} />
        )}
      </MapBottomSheet>
    </main>
  );
}
