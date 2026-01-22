'use client';

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import {
  type ReactNode,
  type RefObject,
  useEffect,
  useLayoutEffect,
} from 'react';
import {
  SHEET_TITLE,
  type SheetPosition,
  type SheetType,
} from '../../types/map';

/**
 * @interface MapBottomSheetProps
 * @description MapBottomSheet 컴포넌트의 타입 정의입니다.
 */
type MapBottomSheetProps = {
  openSheet: SheetType | null;
  position: SheetPosition;
  sheetRef: RefObject<HTMLDivElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
  getTranslateValue: (pos: SheetPosition) => number;
  children: ReactNode;
};

/**
 * @component MapBottomSheet
 * @description 지도의 하단에 표시되는 바텀시트 UI 컴포넌트입니다.
 */
export function MapBottomSheet({
  openSheet,
  position,
  sheetRef,
  contentRef,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  getTranslateValue,
  children,
}: MapBottomSheetProps) {
  /**
   * @effect 애니메이션 제어
   * @description 시트의 좌표가 결정될 때마다 transform 트랜지션을 적용합니다.
   */
  useLayoutEffect(() => {
    if (!sheetRef.current) return;
    const targetY = getTranslateValue(position);
    sheetRef.current.style.transition =
      'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)';
    sheetRef.current.style.transform = `translateY(${targetY}px)`;
  }, [position, getTranslateValue, sheetRef]);

  /**
   * @description 현재 시트의 위치 상태에 따라 내용물 영역의 최대 높이를 계산합니다.
   * half 상태일 때 스크롤이 끊기는 문제를 해결하기 위해 필수적입니다.
   */
  const getContentMaxHeight = () => {
    if (position === 'full') return '100%';
    if (position === 'half' && sheetRef.current) {
      const sheetHeight = sheetRef.current.clientHeight;
      const translateY = getTranslateValue('half');
      return `${sheetHeight - translateY - 40}px`;
    }
    return '0px';
  };
  /**
   * @description 시트가 열리면 body의 스크롤을 막고, 닫히면 다시 풀어줍니다.
   */
  useEffect(() => {
    if (openSheet) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [openSheet]);

  if (!openSheet) return null;

  return (
    <div
      ref={sheetRef}
      className="fixed inset-x-0 bottom-0 z-50 flex h-[81%] flex-col overflow-hidden rounded-t-[10px] border-[#e5e5e5] border-t bg-white shadow-lg"
      style={{ transform: 'translateY(100%)' }}
    >
      <div
        className="flex w-full cursor-grab items-center justify-center py-4 active:cursor-grabbing"
        style={{ touchAction: 'none' }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="h-2 w-24 rounded-full bg-gray-200" />
      </div>

      <div
        className="flex-1 overflow-y-auto"
        style={{
          maxHeight: getContentMaxHeight(),
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
        }}
      >
        <VisuallyHidden>
          <h2>{SHEET_TITLE[openSheet]}</h2>
        </VisuallyHidden>
        <div ref={contentRef}>{children}</div>
      </div>
    </div>
  );
}
