// 서류 보관함 : 클릭 된 카드 컴포넌트
'use client';

import { CreditCard, ChevronUp } from 'lucide-react';
import DocsPreview from './DocsPreview';
import type { DocsCardProps } from './DocsCardClosed';
import { CARD_GRADIENT_CLASS } from '../constants/cardColor';

export default function DocsCardOpened({ title, color }: DocsCardProps) {
  return (
    <section
      className={`h-84 w-83 rounded-xl ${CARD_GRADIENT_CLASS[color]} p-3 shadow-[0_18px_30px_rgba(0,0,0,0.18)]`}
    >
      {' '}
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
          aria-expanded
          className="grid h-9 w-9 place-items-center bg-transparent p-0"
        >
          <ChevronUp />
        </button>
      </div>
      {/* 프리뷰 영역 */}
      <div className="mt-4 ml-4 flex-justify">
        <DocsPreview name="Kelsey Kwon" />
      </div>
      {/* 기간 만료 안내 영역 */}
      <div className="mt-5 ml-2 flex text-white">
        <p className="font-sans text-[11px]">
          전자서명법 기준을 준수한 안전한 인증서
        </p>
      </div>
    </section>
  );
}
