'use client';

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import {
  Bookmark,
  CircleDollarSign,
  Cross,
  Landmark,
  Siren,
} from 'lucide-react';
import { useState } from 'react';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from '@/components/ui/drawer';
import { ExchangeBottomSheet } from './components/ExchangeBottomSheet';
import { NaverMap } from './components/NaverMap';
import { SirenBottomSheet } from './components/SirenBottomSheet';
import { ToggleButton } from './components/ToggleButton';

type SheetType = 'hospital' | 'embassy' | 'exchange' | 'siren' | null;

export default function MapPage() {
  const [openSheet, setOpenSheet] = useState<SheetType>(null);
  const [bookmark, setBookmark] = useState(false);

  const toggleSheet = (type: SheetType) => {
    setOpenSheet((prev) => {
      if (prev === type) return null;
      return type;
    });

    (document.activeElement as HTMLElement)?.blur();
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-gray-100">
      <div className="absolute inset-0 z-0">
        <NaverMap onMarkerClick={() => {}} />
      </div>

      <div
        className="absolute z-10 flex gap-[0.8rem]"
        style={{ top: '1.2rem', left: '1.2rem' }}
      >
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

      <div className="absolute top-[15%] right-[1.2rem] z-10 flex flex-col gap-[0.8rem]">
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
          onClick={() => setBookmark((prev) => !prev)}
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

      <Drawer
        modal={true}
        open={openSheet !== null}
        onOpenChange={(open) => {
          if (!open) setOpenSheet(null);
        }}
      >
        <DrawerContent className="pointer-events-auto z-50 overflow-hidden border-none bg-white shadow-lg">
          <VisuallyHidden>
            <DrawerTitle>
              {openSheet === 'siren' && '긴급 상황 안내'}
              {openSheet === 'exchange' && '환전소 정보'}
              {openSheet === 'hospital' && '병원 정보'}
              {openSheet === 'embassy' && '대사관 정보'}
            </DrawerTitle>
            <DrawerDescription>
              {openSheet === 'siren' && '위기 상황 발생 시 대처 요령 안내'}
              {openSheet === 'exchange' && '주변 환전소 위치 정보'}
              {openSheet === 'hospital' && '인근 의료기관 정보'}
              {openSheet === 'embassy' && '자국 대사관 연락처'}
            </DrawerDescription>
          </VisuallyHidden>

          {openSheet === 'siren' && <SirenBottomSheet />}
          {openSheet === 'exchange' && <ExchangeBottomSheet />}
          {openSheet === 'hospital' && <div>병원 바텀시트 내용</div>}
          {openSheet === 'embassy' && <div>대사관 바텀시트 내용</div>}
        </DrawerContent>
      </Drawer>
    </main>
  );
}
