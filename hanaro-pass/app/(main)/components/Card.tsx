'use client';

import { Lock } from 'lucide-react';
import Image from 'next/image';
import type { CardData } from '../mock/mockCard';

interface CardProps {
  cards: CardData[];
  isUnlocked: boolean;
  onLockClickAction: () => void;
}

export default function Card({
  cards,
  isUnlocked,
  onLockClickAction,
}: CardProps) {
  return (
    <div className="w-full overflow-hidden rounded-4xl border border-gray-100 py-7.5">
      <div className="scrollbar-hide flex w-full snap-x snap-mandatory gap-4 overflow-x-auto px-[calc(50%-131px)] pb-4">
        {cards.map((card) => (
          <div key={card.id} className="flex flex-col gap-3">
            <div
              className={`h-41.25 w-65.5 shrink-0 snap-center overflow-hidden rounded-3xl ${card.color}`}
            >
              <Image
                src={card.imageUrl}
                alt={card.name}
                width={262}
                height={165}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div className="flex h-7.5 items-center justify-between rounded-lg bg-[linear-gradient(91deg,#00D7B7_0.22%,#48AFAD_40.09%,#008485_100%)] px-2 text-white">
              <p className="font-bold text-[12px] opacity-70">잔액</p>
              <p className="font-bold text-[12px] text-lg">{card.balance}원</p>
            </div>
          </div>
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
