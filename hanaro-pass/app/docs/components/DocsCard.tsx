// 서류 보관함 : 카드 컴포넌트
'use client';

import { ChevronDown, ChevronUp, CreditCard } from 'lucide-react';
import { useState } from 'react';
import type { CardColor } from '../constants/cardColor';
import { CARD_GRADIENT_CLASS } from '../constants/cardColor';
import DocsPreview from './DocsPreview';

export type DocsCardProps = {
  title: string;
  color: CardColor;
  initialOpen?: boolean;
};

export default function DocsCard({ title, color, initialOpen }: DocsCardProps) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  return (
    <section
      className={
        isOpen
          ? `h-84 w-83 rounded-xl ${CARD_GRADIENT_CLASS[color]} p-3 shadow-[0_18px_30px_rgba(0,0,0,0.18)]`
          : `h-30 w-83 rounded-xl ${CARD_GRADIENT_CLASS[color]} p-3 shadow-[0_18px_30px_rgba(0,0,0,0.18)]`
      }
    >
      {/* 헤더 영역 */}
      <div className="grid grid-cols-[1fr_auto] items-start text-white">
        {/* 왼쪽: 아이콘 + 타이틀 */}
        <div className="flex min-w-0 items-center gap-5">
          <div className="grid h-9 w-9 flex-none place-items-center rounded-full bg-white/20">
            <CreditCard size={20} />
          </div>
          <p className="font-sans font-semibold text-[16px]">{title}</p>
        </div>

        {/* 오른쪽: 토글 아이콘 */}
        <button
          type="button"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center bg-transparent p-0"
        >
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>

      {/* 프리뷰 카드 영역(열렸을 때만) */}
      {isOpen ? (
        <>
          {/* 프리뷰 영역 */}
          <div className="mt-4 ml-4 flex">
            <DocsPreview name="Kelsey Kwon" />
          </div>
          {/* 기간 만료 안내 영역 */}
          <div className="mt-5 ml-2 flex text-white">
            <p className="font-sans text-[11px]">
              전자서명법 기준을 준수한 안전한 인증서
            </p>
          </div>
        </>
      ) : null}
    </section>
  );
}
