'use client';

import { ChevronUp, CreditCard } from 'lucide-react';
import DocsPreview from './DocsPreview';
import type { CardColor } from '../constants/cardColor';
import { CARD_GRADIENT_CLASS } from '../constants/cardColor';
import { useEffect, useState } from 'react';

type DocsCardProps = {
  title: string;
  color: CardColor;
  initialOpen?: boolean;
  onToggle?: () => void;
};

export default function DocsCard({
  title,
  color,
  initialOpen = false,
  onToggle,
}: DocsCardProps) {
  const [isOpen, setIsOpen] = useState(initialOpen);

  // 부모가 onToggle 넘기면 그걸 우선 사용
  // 스토리북에서 사용할 수 있도록 독립적으로도 isOpen 사용할 수 있게함
  const handleToggle = () => {
    if (onToggle) return onToggle();
    setIsOpen((v) => !v);
  };

  // 부모 상태가 바뀌면 반영되게
  useEffect(() => setIsOpen(initialOpen), [initialOpen]);

  return (
    <section
      className={`w-83 rounded-xl shadow-[0_18px_30px_rgba(0,0,0,0.18)] ${CARD_GRADIENT_CLASS[color]} transition-[padding] duration-300 ease-in-out ${isOpen ? 'p-3 pb-10' : 'p-3 pb-15'}`}
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
          onClick={handleToggle}
          aria-expanded={isOpen}
          className="grid h-9 w-9 place-items-center bg-transparent p-0"
        >
          <ChevronUp
            className={`transition-transform duration-200 ease-out ${isOpen ? 'rotate-0' : 'rotate-180'}`}
          />
        </button>
      </div>

      {/* 프리뷰 영역 */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-175 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="mt-4 ml-4 flex">
          <DocsPreview name="Kelsey Kwon" />
        </div>
        {/* 기간 만료 안내 영역 */}
        <div className="mt-5 ml-2 flex text-white">
          <p className="font-sans text-[11px]">
            전자서명법 기준을 준수한 안전한 인증서
          </p>
        </div>
      </div>
    </section>
  );
}
