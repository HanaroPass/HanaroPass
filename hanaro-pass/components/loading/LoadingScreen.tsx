'use client';

import Image from 'next/image';

export default function LoadingScreen() {
  return (
    <div className="relative min-h-dvh w-full overflow-hidden bg-white-ez">
      <div className="px-10 pt-40">
        <h1
          className="text-[50px] leading-none tracking-[-0.5px]"
          style={{
            fontFamily: 'var(--font-hana)',
            color: 'var(--color-hana-green)',
            fontWeight: 700,
          }}
        >
          HanaEZ
        </h1>
        <p
          className="mt-2 text-[18px]"
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
        <div className="relative h-100 w-full">
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
              width={250}
              height={250}
              priority
              className="drop-shadow-[0_10px_18px_rgba(16,24,40,0.10)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
