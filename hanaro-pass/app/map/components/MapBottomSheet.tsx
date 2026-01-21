'use client';

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { type ReactNode, type RefObject, useEffect } from 'react';
import { SHEET_TITLE, type SheetPosition, type SheetType } from '../types/map';

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
  onTouchEnd: (e: React.TouchEvent) => void;
  getTranslateValue: (pos: SheetPosition) => number;
  children: ReactNode;
};

/**
 * @component MapBottomSheet
 * @description 지도의 하단에 표시되는 바텀시트 UI 컴포넌트입니다.
 * shadcn/ui Drawer와 유사한 디자인을 가지며, 전달받은 터치 핸들러를 통해 드래그 기능을 수행합니다.
 * position 상태가 변경될 때마다 useEffect를 통해 부드러운 CSS 트랜지션을 실행합니다.
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
   * @description 시트의 좌표(targetY)가 결정될 때마다 transform 트랜지션을 적용합니다.
   * 드래그 중(Move)에는 트랜지션이 없다가, 손을 떼면(Snap) 부드럽게 감속하며 자석처럼 붙습니다.
   */
  useEffect(() => {
    if (!sheetRef.current) return;
    const targetY = getTranslateValue(position);
    sheetRef.current.style.transition =
      'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)';
    sheetRef.current.style.transform = `translateY(${targetY}px)`;
  }, [position, getTranslateValue, sheetRef]);

  if (!openSheet) return null;

  return (
    <div
      ref={sheetRef}
      className="fixed inset-x-0 bottom-0 z-50 flex h-[81%] flex-col overflow-hidden rounded-t-[10px] border-[#e5e5e5] border-t bg-white shadow-lg"
      style={{ transform: 'translateY(100%)', touchAction: 'none' }}
    >
      <div
        className="flex w-full cursor-grab items-center justify-center py-4 active:cursor-grabbing"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="h-2 w-24 rounded-full bg-gray-200" />
      </div>

      <div className="flex-1 overflow-y-auto pb-1">
        <VisuallyHidden>
          <h2>{SHEET_TITLE[openSheet]}</h2>
        </VisuallyHidden>
        <div ref={contentRef}>{children}</div>
      </div>
    </div>
  );
}
