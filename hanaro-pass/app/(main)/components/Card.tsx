'use client';

import { Lock } from 'lucide-react';
import Image from 'next/image';
import { memo, useCallback, useRef, useState } from 'react';
import type { CardData } from '../mock/mockCard';

interface CardProps {
  cards: CardData[];
  isUnlocked: boolean;
  onLockClickAction: () => void;
}

const CardItem = memo(
  ({
    card,
    index,
    activeIndex,
  }: {
    card: CardData;
    index: number;
    activeIndex: number;
  }) => {
    const diff = index - activeIndex;

    const translateX = diff * 60;
    const translateZ = Math.abs(diff) * -150;
    const rotateY = diff * -15;

    const style = {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
      zIndex: 100 - Math.abs(diff),
    };

    return (
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={style}
      >
        <div
          className={`h-41.25 w-65.5 overflow-hidden rounded-xl ${card.color} shadow-lg ring-1 ring-black/5`}
        >
          <Image
            src={card.imageUrl}
            alt={card.name}
            width={262}
            height={165}
            className="h-full w-full select-none object-cover"
            priority={index === 0}
          />
        </div>
      </div>
    );
  },
);

export default function Card({
  cards,
  isUnlocked,
  onLockClickAction,
}: CardProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartRef = useRef<number | null>(null);

  const handleSwipe = useCallback(
    (direction: 'NEXT' | 'PREV') => {
      if (isAnimating) return;

      setActiveIndex((prev) => {
        if (direction === 'NEXT' && prev < cards.length - 1) return prev + 1;
        if (direction === 'PREV' && prev > 0) return prev - 1;
        return prev;
      });

      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [cards.length, isAnimating],
  );

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current === null) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEnd;

    if (Math.abs(diff) > 40) {
      handleSwipe(diff > 0 ? 'NEXT' : 'PREV');
    }
    touchStartRef.current = null;
  };

  return (
    <div className="w-full select-none overflow-hidden rounded-4xl border border-gray-100 bg-white py-8 shadow-sm">
      <div
        className="relative h-48 w-full touch-none"
        style={{ perspective: '1200px' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {cards.map((card, index) => (
          <CardItem
            key={card.id}
            card={card}
            index={index}
            activeIndex={activeIndex}
          />
        ))}
      </div>

      <button
        type="button"
        className="relative flex h-28 w-full flex-col items-center justify-center bg-white px-4 transition-opacity active:opacity-70"
        onClick={!isUnlocked ? onLockClickAction : undefined}
        aria-label={
          isUnlocked
            ? '결제 바코드 활성화됨'
            : 'PIN 번호를 입력하여 바코드 보기'
        }
      >
        <div
          className={`h-10 w-full border transition-all duration-700 ease-in-out ${
            !isUnlocked ? 'blur-xl' : 'blur-0'
          }`}
        >
          <div className="h-full w-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Ean-13-registration-area.svg/1200px-Ean-13-registration-area.svg.png')] bg-center bg-contain bg-no-repeat" />
        </div>

        {!isUnlocked && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full border border-gray-100 bg-white/90 p-3 shadow-lg">
              <Lock className="text-black-800" size={24} />
            </div>
          </div>
        )}

        <p className="mt-4 text-[11px] text-gray-500 tracking-[0.2em]">
          {isUnlocked && '8801234 567890'}
        </p>
      </button>
    </div>
  );
}
