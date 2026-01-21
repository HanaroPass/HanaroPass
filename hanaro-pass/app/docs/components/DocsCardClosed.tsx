// 서류 보관함 : 클릭안된 카드 컴포넌트
'use client';

import { ChevronDown, CreditCard } from 'lucide-react';
import { CARD_GRADIENT_CLASS, type CardColor } from '../constants/cardColor';

export type DocsCardProps = {
  title: string;
  color: CardColor;
};

export default function DocsCardClosed({ title, color }: DocsCardProps) {
  return (
    <section
      className={`h-30 w-83 rounded-xl ${CARD_GRADIENT_CLASS[color]} p-3 shadow-[0_18px_30px_rgba(0,0,0,0.18)]`}
    >
      {/* 헤더 영역 */}
      <div className="grid grid-cols-[1fr_auto] items-center text-white">
        {/* 왼쪽: 아이콘 + 타이틀 */}
        <div className="flex min-w-0 items-center gap-5">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-white/20">
            <CreditCard size={20} />
          </div>
          <p className="font-sans font-semibold text-[16px]">{title}</p>
        </div>

        {/* 오른쪽: 토글 아이콘 */}
        <button
          type="button"
          aria-expanded
          className="grid h-9 w-9 place-items-center bg-transparent p-0"
        >
          <ChevronDown />
        </button>
      </div>
    </section>
  );
}
