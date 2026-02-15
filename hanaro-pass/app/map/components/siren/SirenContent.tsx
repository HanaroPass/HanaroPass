'use client';

import Image from 'next/image';
import React from 'react';
import { PASSPORT_STEPS } from '../../constants/emergency';

type SirenContentProps = {
  lang: 'ko' | 'en';
};

export function SirenContent({ lang }: SirenContentProps) {
  const currentSteps = PASSPORT_STEPS[lang];

  return (
    <div>
      <div className="w-full">
        <Image
          src="/images/map/img_map_emergency.png"
          alt={
            lang === 'ko' ? '여권 분실 안내 지도' : 'Passport loss guide map'
          }
          width={380}
          height={210}
          className="h-auto w-full"
        />
      </div>

      <div className="flex flex-col gap-4 p-5">
        {currentSteps.map((s) => (
          <div
            key={s.id}
            className="flex items-center gap-4 rounded-2xl bg-green-200 p-4"
          >
            <div className="flex shrink-0 items-center">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-full bg-white ${s.iconColor}`}
              >
                {React.cloneElement(s.icon, { className: 'h-11 w-11' })}
              </div>
            </div>

            <div className="flex flex-col justify-center gap-1 text-black-900">
              <div className="font-bold text-base">{s.step}</div>
              <p className="text-sm">{s.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
