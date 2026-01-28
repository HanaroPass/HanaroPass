'use client';

import Image from 'next/image';

export default function LoadingScreen() {
  return (
    <div className="relative h-dvh w-full overflow-hidden bg-color-white-ez">
      <div className="px-10 pt-30">
        <h1
          className="text-[44px] leading-none tracking-[-0.5px]"
          style={{
            fontFamily: 'var(--font-hana)',
            color: 'var(--color-hana-green)',
            fontWeight: 700,
          }}
        >
          HanaEZ
        </h1>
        <p
          className="mt-2 text-[16px]"
          style={{
            color: 'var(--color-hana-green)',
            opacity: 0.85,
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
          }}
        >
          My Easy Life, Hana EZ!
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-30 flex flex-col items-center">
        <div className="relative h-90 w-90 max-w-[92vw]">
          <Image
            src="/images/loading/back.png"
            alt="loading background"
            fill
            priority
            className="object-cover object-bottom"
          />

          {/* 별돌이 + 위아래 움직임 */}
          <div className="absolute right-2 bottom-0 animate-star-float">
            <Image
              src="/images/loading/star.png"
              alt="star"
              width={210}
              height={210}
              priority
              className="drop-shadow-[0_10px_18px_rgba(16,24,40,0.10)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
