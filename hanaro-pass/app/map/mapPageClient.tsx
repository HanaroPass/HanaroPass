'use client';

import {
  Bookmark,
  CircleDollarSign,
  Cross,
  Landmark,
  LocateFixed,
  Siren,
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Embassy, SavedPlace } from '@/lib/generated/prisma';
import { BookmarkContent } from './components/bookmark/BookmarkContent';
import { EmbassyContent } from './components/embassy/EmbassyContent';
import { ExchangeContent } from './components/exchange/ExchangeContent';
import { HospitalContent } from './components/hospital/HospitalContent';
import { SirenContent } from './components/siren/SirenContent';
import { FloatingLayer } from './components/ui/FloatingLayer';
import { MapBottomSheet } from './components/ui/MapBottomSheet';
import {
  NaverMap,
  type NaverMapHandle,
  type NaverSearchResult,
} from './components/ui/NaverMap';
import { ToggleButton } from './components/ui/ToggleButton';
import { MAP_UI_TEXTS } from './constants/mapTranslations';
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
  lang: 'ko' | 'en';
};

export default function MapPageClient({
  hospitals,
  initialEmbassy,
  initialSavedPlaces,
  lang: initialLang,
}: MapPageClientProps) {
  const [lang, setLang] = useState<'ko' | 'en'>(initialLang);
  const [savedPlaces] = useState<SavedPlace[]>(initialSavedPlaces);
  const [myEmbassy] = useState<Embassy | null>(initialEmbassy);
  const [bookmark, setBookmark] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<
    SavedPlace | Embassy | NaverSearchResult | null
  >(null);
  const [currentMapRegion, setCurrentMapRegion] = useState('');
  const [mapBounds, setMapBounds] = useState<MapBounds | null>(null);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number }>();

  const router = useRouter();
  const searchParams = useSearchParams();
  const mapControlRef = useRef<NaverMapHandle>(null);

  const toggleLang = () => {
    const nextLang = lang === 'ko' ? 'en' : 'ko';
    setLang(nextLang);
    const params = new URLSearchParams(searchParams.toString());

    params.set('lang', nextLang);

    router.replace(`/map?${params.toString()}`);
  };

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

  const hospitalFilter = useHospitalFilters(hospitals, mapBounds, lang);

  const { selectedHospital, setSelectedHospital } = hospitalFilter;

  const { exchangeResults, searchExchanges, clearResults } = useExchangeSearch(
    currentMapRegion,
    lang,
  );

  const t = MAP_UI_TEXTS[lang];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setUserCoords({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }),
        (err) => console.warn('위치 정보를 가져올 수 없습니다.', err),
      );
    }
  }, []);

  useEffect(() => {
    if (openSheet !== 'exchange' || !currentMapRegion) return;
    const timer = setTimeout(() => searchExchanges(), 1000);
    return () => clearTimeout(timer);
  }, [currentMapRegion, openSheet, searchExchanges]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <reset sheet lang>
  useEffect(() => {
    if (!openSheet) return;

    const sheet = openSheet as
      | 'hospital'
      | 'exchange'
      | 'embassy'
      | 'siren'
      | 'bookmark';

    setSelectedPlace(null);
    toggleSheet(sheet, false);
    if (sheet === 'exchange') {
      const timer = setTimeout(async () => {
        await searchExchanges();
        toggleSheet('exchange', true);
      }, 100);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => toggleSheet(sheet, true), 50);
    return () => clearTimeout(timer);
  }, [lang]);

  const handleMapMove = useCallback((address: string, bounds?: MapBounds) => {
    setCurrentMapRegion(address);
    if (bounds) setMapBounds(bounds);
  }, []);

  const handleExchangeClick = useCallback(async () => {
    if (openSheet === 'exchange') {
      clearResults();
      toggleSheet('exchange', false);
      setSelectedPlace(null);
      return;
    }

    clearResults();
    await searchExchanges(true);
    toggleSheet('exchange', true);
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
          lang={lang}
        />
      </div>

      <FloatingLayer>
        <div className="absolute top-3 right-0 left-0 z-40">
          <div className="flex gap-2.5 overflow-x-auto px-3 pb-2 [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex flex-nowrap items-center gap-2.5">
              <ToggleButton
                variant="icon"
                active={lang === 'en'}
                onClick={toggleLang}
                ariaLabel={lang === 'en' ? 'Switch to KO' : 'Switch to EN'}
                iconColorVariant="gray"
                icon={
                  <span className="flex items-center justify-center font-semibold text-base leading-none">
                    {lang === 'en' ? 'KO' : 'EN'}
                  </span>
                }
              />

              <ToggleButton
                variant="pill"
                label={t.hospital}
                icon={
                  <Cross
                    className="h-4 w-4"
                    fill="currentColor"
                    strokeWidth={3}
                  />
                }
                active={openSheet === 'hospital'}
                iconColorVariant="red"
                ariaLabel={t.hospital}
                onClick={() => {
                  setSelectedHospital(null);
                  toggleSheet('hospital');
                }}
              />
              <ToggleButton
                variant="pill"
                label={t.embassy}
                icon={<Landmark className="h-4 w-4" />}
                active={openSheet === 'embassy'}
                iconColorVariant="blue"
                ariaLabel={t.embassy}
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
                label={t.exchange}
                icon={<CircleDollarSign className="h-4 w-4" />}
                active={openSheet === 'exchange'}
                iconColorVariant="yellow"
                ariaLabel={t.exchange}
                onClick={handleExchangeClick}
              />
            </div>
          </div>
        </div>

        <div className="absolute top-[15%] right-3 z-40 flex flex-col gap-2.5">
          <ToggleButton
            variant="icon"
            active={false}
            icon={<LocateFixed className="h-5 w-5" />}
            iconColorVariant="gray"
            ariaLabel={t.myLocation}
            onClick={() => mapControlRef.current?.centerToMyPosition()}
          />
          <ToggleButton
            variant="icon"
            active={bookmark}
            icon={
              <Bookmark
                className="h-5 w-5"
                fill={bookmark ? 'currentColor' : 'none'}
              />
            }
            ariaLabel={t.bookmark}
            onClick={() => setBookmark(!bookmark)}
          />
          <ToggleButton
            variant="icon"
            active={openSheet === 'siren'}
            icon={<Siren className="h-5 w-5" />}
            iconColorVariant="red"
            colorVariant="red"
            ariaLabel={t.emergency}
            onClick={() => toggleSheet('siren')}
          />
        </div>
      </FloatingLayer>

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
        {openSheet === 'bookmark' &&
          selectedPlace &&
          'nameKo' in selectedPlace &&
          'category' in selectedPlace && (
            <BookmarkContent
              data={selectedPlace as SavedPlace}
              userCoords={userCoords}
              lang={lang}
            />
          )}
        {openSheet === 'hospital' && (
          <HospitalContent
            mode={selectedHospital ? 'detail' : 'list'}
            hospitals={hospitals}
            mapBounds={mapBounds}
            hospital={selectedHospital ?? undefined}
            lang={lang}
            filterState={hospitalFilter}
            onBackToList={() => {
              setSelectedHospital(null);
              toggleSheet('hospital', true);
            }}
          />
        )}
        {openSheet === 'siren' && <SirenContent lang={lang} />}
        {openSheet === 'exchange' && (
          <ExchangeContent
            results={formatExchangeData(exchangeResults, lang)}
            selectedPlace={
              selectedPlace && 'mapx' in selectedPlace
                ? mapDbToInfo(selectedPlace, lang)
                : null
            }
            lang={lang}
            onBackToList={() => {
              setSelectedPlace(null);
              toggleSheet('exchange', true);
            }}
          />
        )}
        {openSheet === 'embassy' && (
          <EmbassyContent
            data={myEmbassy}
            userCoords={userCoords}
            lang={lang}
          />
        )}
      </MapBottomSheet>
    </main>
  );
}
