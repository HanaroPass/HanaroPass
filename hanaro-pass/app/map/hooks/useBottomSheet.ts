'use client';

import { useCallback, useRef, useState } from 'react';
import type { SheetPosition, SheetType } from '../types/map';

/**
 * @hook useBottomSheet
 * @description 바텀시트의 상태 관리 및 터치 드래그 인터랙션을 처리하는 커스텀 훅입니다.
 * 시트의 열림/닫힘 상태, 스냅 위치 계산, 직접 DOM 조작 로직을 포함합니다.
 * * @returns {Object}
 * - openSheet: 현재 열린 시트 타입
 * - sheetPosition: 시트의 스냅 위치 ('closed' | 'half' | 'full')
 * - sheetRef: 시트 컨테이너 엘리먼트 Ref
 * - contentRef: 내부 콘텐츠 엘리먼트 Ref (높이 측정용)
 * - toggleSheet: 시트 열기/닫기 토글 함수
 * - handleTouchStart/Move/End: 드래그 인터랙션 핸들러
 * - getTranslateValue: 상태별 Y축 이동값 계산 함수
 */
export function useBottomSheet() {
  const [openSheet, setOpenSheet] = useState<SheetType | null>(null);
  const [sheetPosition, setSheetPosition] = useState<SheetPosition>('closed');

  const sheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number>(0);
  const startTranslate = useRef<number>(0);

  /**
   * @function getTranslateValue
   * @description 시트의 상태(Position)에 따른 translateY 수치(px)를 계산합니다.
   * 'full' 상태일 때는 콘텐츠의 실제 높이를 측정하여 화면에 맞춤형 높이를 제공합니다.
   */
  const getTranslateValue = useCallback((pos: SheetPosition): number => {
    if (!sheetRef.current) return 0;
    const sheetHeight = sheetRef.current.clientHeight;
    if (pos === 'closed') return sheetHeight;
    if (pos === 'half') return sheetHeight * 0.35;

    const contentHeight = contentRef.current?.scrollHeight || 0;
    const fitPos = Math.max(0, sheetHeight - (contentHeight + 60));
    return contentHeight > sheetHeight ? 0 : fitPos;
  }, []);

  /**
   * @function handleOpen
   * @description 시트를 열 때 호출되는 내부 함수입니다.
   * 콘텐츠 높이를 계산하여 half로 열지 full로 열지 결정합니다.
   */
  const handleOpen = (type: SheetType) => {
    setOpenSheet(type);
    setTimeout(() => {
      const contentHeight = contentRef.current?.scrollHeight || 0;
      const sheetHeight = sheetRef.current?.clientHeight || 0;
      setSheetPosition(contentHeight > sheetHeight * 0.35 ? 'half' : 'full');
    }, 10);
  };

  /**
   * @function toggleSheet
   * @description 외부 버튼 클릭 혹은 마커 클릭 시 호출됩니다.
   */
  const toggleSheet = (type: SheetType, isMarkerClick?: boolean) => {
    // 이미 같은 타입의 시트가 열려있는데 마커를 클릭한 경우 (닫았다가 다시 열기)
    if (openSheet === type && isMarkerClick) {
      setSheetPosition('closed');
      setTimeout(() => {
        handleOpen(type);
      }, 300);
      return;
    }

    // 같은 타입을 눌렀을 때 (토글 닫기)
    if (openSheet === type) {
      setSheetPosition('closed');
      setTimeout(() => setOpenSheet(null), 300);
    }
    // 다른 타입을 눌렀을 때 (교체)
    else if (openSheet) {
      setSheetPosition('closed');
      setTimeout(() => handleOpen(type), 300);
    }
    // 새로 열 때
    else {
      handleOpen(type);
    }
  };

  /**
   * @section Touch Event Handlers
   * @description 드래그 앤 드롭 기능을 담당하는 핸들러 모음입니다.
   */
  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    if (sheetRef.current) {
      const matrix = new DOMMatrixReadOnly(
        getComputedStyle(sheetRef.current).transform,
      );
      startTranslate.current = matrix.m42;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!sheetRef.current) return;
    const deltaY = e.touches[0].clientY - startY.current;
    const sheetHeight = sheetRef.current.clientHeight;
    const fullPos = getTranslateValue('full');
    let translateY = startTranslate.current + deltaY;
    translateY = Math.min(sheetHeight, Math.max(fullPos, translateY));
    sheetRef.current.style.transition = 'none';
    sheetRef.current.style.transform = `translateY(${translateY}px)`;
  };

  const handleTouchEnd = () => {
    if (!sheetRef.current) return;
    const currentY = new DOMMatrixReadOnly(
      getComputedStyle(sheetRef.current).transform,
    ).m42;
    const deltaY = currentY - startTranslate.current;
    const velocity = deltaY > 5 ? 150 : deltaY < -5 ? -150 : 0;
    const adjustedY = currentY + velocity;

    const positions: SheetPosition[] = ['full', 'half', 'closed'];
    const closest = positions.reduce((prev, curr) =>
      Math.abs(adjustedY - getTranslateValue(curr)) <
      Math.abs(adjustedY - getTranslateValue(prev))
        ? curr
        : prev,
    );

    setSheetPosition(closest);
    if (closest === 'closed') setTimeout(() => setOpenSheet(null), 300);
  };

  return {
    openSheet,
    sheetPosition,
    sheetRef,
    contentRef,
    toggleSheet,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    getTranslateValue,
  };
}
