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

export default function MapPage() {
  const [bookmark, setBookmark] = useState(false);

  const [selectedBookmark, setSelectedBookmark] = useState<SavedPlace | null>(
    null,
  );
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
      {/* ================= 지도 ================= */}
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
              setSelectedBookmark(null);
              toggleSheet('hospital', true);
              return;
            }

            const isSame = selectedBookmark?.id === place.id;
            if (isSame) {
              setSelectedBookmark(null);
              toggleSheet('bookmark');
            } else {
              setSelectedBookmark(place);
              toggleSheet('bookmark', true);
            }
          }}
        />
      </div>

      {/* ================= 상단 카테고리 ================= */}
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

      {/* ================= 우측 버튼 ================= */}
      <div className="absolute top-[15%] right-3 z-10 flex flex-col gap-2.5">
        <ToggleButton
          variant="icon"
          icon={<LocateFixed className="h-5 w-5" />}
          ariaLabel="내 위치"
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
          ariaLabel="북마크"
          onClick={() => setBookmark((v) => !v)}
        />
        <ToggleButton
          variant="icon"
          icon={<Siren className="h-5 w-5" />}
          active={openSheet === 'siren'}
          iconColorVariant="red"
          colorVariant="red"
          ariaLabel="긴급"
          onClick={() => toggleSheet('siren')}
        />
      </div>

      {/* ================= 바텀시트 ================= */}
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
        {openSheet === 'bookmark' && selectedBookmark && (
          <div className="px-6 py-4">
            <PlaceCard
              data={{
                name: selectedBookmark.placeName,
                type: selectedBookmark.category,
                address: selectedBookmark.address,
                phone: selectedBookmark.phone,
                distance: '',
                imageUrl: '',
                status: '',
                explainTime: selectedBookmark.openHours,
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
