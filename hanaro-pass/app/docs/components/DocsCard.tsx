'use client';

import { ChevronUp, CreditCard } from 'lucide-react';
import DocsPreview from './DocsPreview';
import type { CardColor } from '../constants/cardColor';
import { CARD_GRADIENT_CLASS } from '../constants/cardColor';
import { useRouter } from 'next/navigation';

type DocsCardProps = {
  title: string;
  color: CardColor;
  isOpen: boolean;
  onToggle: () => void;
  docId: string;
};

export default function DocsCard({
  title,
  color,
  isOpen,
  onToggle,
  docId,
}: DocsCardProps) {
  const router = useRouter();
  const goDetail = () => {
    router.push(`/docs/${docId}`);
  };
  return (
    <div
      className={`w-83 rounded-xl shadow-[0_18px_30px_rgba(0,0,0,0.18)] ${CARD_GRADIENT_CLASS[color]} transition-[padding] duration-300 ease-in-out ${isOpen ? 'p-4 pb-10' : 'p-4 pb-15'}`}
    >
      {/* 헤더 영역 */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="grid w-full grid-cols-[1fr_auto] items-start text-left text-white"
      >
        {/* 아이콘 + 타이틀 */}
        <div className="flex min-w-0 items-center gap-5">
          <div className="grid h-9 w-9 flex-none place-items-center rounded-full bg-white/20">
            <CreditCard size={20} />
          </div>
          <p className="font-sans font-semibold text-[16px]">{title}</p>
        </div>

        {/* 토글 아이콘 */}
        <ChevronUp
          className={`transition-transform duration-200 ease-out ${isOpen ? 'rotate-0' : 'rotate-180'}`}
        />
      </button>

      {/* 프리뷰 영역 */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-175 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <button
          type="button"
          onClick={goDetail}
          className="mt-4 ml-4 inline-flex transition-transform duration-150 ease-out active:scale-[0.97]"
        >
          <DocsPreview name="Kelsey Kwon" />
        </button>
        {/* 기간 만료 안내 영역 */}
        <div className="mt-5 ml-2 flex text-white">
          <p className="font-sans text-[11px]">
            전자서명법 기준을 준수한 안전한 인증서
          </p>
        </div>
      </div>
    </div>
  );
}
