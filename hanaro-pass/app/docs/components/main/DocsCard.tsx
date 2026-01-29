'use client';

import { useRouter } from 'next/navigation';
import { CARD_GRADIENT_CLASS, type CardColor } from '../../constants/cardColor';
import DocsPreview from './DocsPreview';
import { ChevronUp, CreditCard } from 'lucide-react';

type DocsCardProps = {
  title: string;
  color: CardColor;
  userName: string;
  isOpen: boolean;
  onToggle: () => void;
  docId: string;
};

export default function DocsCard({
  title,
  color,
  userName,
  isOpen,
  onToggle,
  docId,
}: DocsCardProps) {
  const router = useRouter();
  const goDetail = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    if (docId === 'passport' || docId === 'arc') {
      router.push(`/identity?step=result&type=${docId}`);
    } else {
      router.push(`/docs/${docId}`);
    }
  };

  return (
    <div
      className={`relative w-83 rounded-xl shadow-[0_18px_30px_rgba(0,0,0,0.18)] ${
        CARD_GRADIENT_CLASS[color]
      } transition-[padding] duration-300 ease-in-out ${
        isOpen ? 'p-4 pb-10' : 'p-4 pb-15'
      }`}
    >
      {/*전체 영역 클릭 담당*/}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="absolute inset-0 z-0 h-full w-full cursor-pointer rounded-xl bg-transparent"
        aria-label={`${title} 펼치기`}
      />
      <div className="pointer-events-none relative z-10">
        {/* 헤더 영역 */}
        <div className="grid w-full grid-cols-[1fr_auto] items-start text-left text-white">
          <div className="flex min-w-0 items-center gap-5">
            <div className="grid h-9 w-9 flex-none place-items-center rounded-full bg-white/20">
              <CreditCard size={20} />
            </div>
            <p className="font-sans font-semibold text-[16px]">{title}</p>
          </div>
          <ChevronUp
            className={`transition-transform duration-200 ease-out ${
              isOpen ? 'rotate-0' : 'rotate-180'
            }`}
          />
        </div>

        {/* 프리뷰 영역 */}
        <div
          aria-hidden={!isOpen}
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? 'max-h-175 opacity-100'
              : 'pointer-events-none max-h-0 opacity-0'
          }`}
        >
          <button
            type="button"
            onClick={goDetail}
            tabIndex={isOpen ? 0 : -1}
            className="pointer-events-auto mt-4 ml-4 inline-flex transition-transform duration-150 ease-out active:scale-[0.97]"
          >
            <DocsPreview userName={userName} />
          </button>

          <div className="mt-5 ml-2 flex text-white">
            <p className="font-sans text-[11px]">
              전자서명법 기준을 준수한 안전한 인증서
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
