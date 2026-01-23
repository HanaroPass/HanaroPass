'use client';

import { Clock, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import type React from 'react';
import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

export default function BenefitDetailPage() {
  return (
    <div className="relative min-h-screen bg-white text-black-800">
      <main>
        <section className="px-6 py-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-black text-2xl">비발디파크</h2>
              <p className="mt-1 text-gray-500 text-sm">
                강원도 홍천 스키 리조트
              </p>
            </div>
            <span className="rounded-full bg-green-ez px-4 py-1.5 font-bold text-[12px] text-white shadow-sm">
              하나EZ BEST
            </span>
          </div>

          <div className="relative mt-6 h-28.75 w-full overflow-hidden rounded-xl">
            <Image
              src="https://images.unsplash.com/photo-1551698618-1fed5d978044?q=80&w=2070&auto=format&fit=crop"
              alt="비발디파크 스노우보드"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </section>

        <section className="px-6 py-8">
          <h3 className="mb-4 font-black text-lg">혜택 상세</h3>
          <ul className="space-y-4">
            <ListItem color="bg-green-ez">
              리프트 1일권 20% 할인 (최대 12,000원)
            </ListItem>
            <ListItem color="bg-green-ez">장비 렌탈 10% 추가 할인</ListItem>
            <ListItem color="bg-green-ez">주중/주말 모두 사용 가능</ListItem>
            <ListItem color="bg-green-ez">본인 포함 최대 4인까지 적용</ListItem>
          </ul>
        </section>

        <hr className="h-2 border-none bg-gray-50" />

        <section className="px-6 py-8">
          <h3 className="mb-6 font-black text-lg">이용 안내</h3>
          <div className="space-y-6">
            <InfoItem
              icon={<Clock size={20} className="text-gray-400" />}
              title="운영시간"
              content={
                <div className="text-gray-600 text-sm">
                  <p>평일 08:30 - 16:30 / 주말 08:00 - 17:00</p>
                </div>
              }
            />
            <InfoItem
              icon={<Phone size={20} className="text-gray-400" />}
              title="고객센터"
              content={<p className="text-gray-600 text-sm">1588-4888</p>}
            />
            <InfoItem
              icon={<MapPin size={20} className="text-gray-400" />}
              title="스키장 예약"
              content={
                <button className="text-green-ez text-sm underline underline-offset-4">
                  예약 페이지로 이동
                </button>
              }
            />
          </div>
        </section>

        <hr className="h-2 border-none bg-gray-50" />

        <section className="px-6 py-8">
          <h3 className="mb-4 font-black text-lg">유의사항</h3>
          <ul className="list-disc space-y-2 text-[13px] text-gray-500 leading-relaxed">
            <ListItem>
              본 혜택은 타 할인/쿠폰과 중복 사용이 불가합니다.
            </ListItem>
            <ListItem>리프트권 구매 시 바코드를 제시해주세요.</ListItem>
            <ListItem>현금 환불 및 재발급이 불가합니다.</ListItem>
            <ListItem>기상 상황에 따라 운영이 중단될 수 있습니다.</ListItem>
            <ListItem>성수기 및 특정일은 사용이 제한될 수 있습니다.</ListItem>
          </ul>
        </section>
      </main>

      <footer className="sticky right-0 bottom-0 left-0 px-6 py-4">
        <button className="flex h-14 w-full items-center justify-center rounded-xl bg-green-ez font-bold text-lg text-white">
          하나 더 이지 카드 만들기
        </button>
      </footer>
    </div>
  );
}

function ListItem({
  children,
  color = 'bg-black-800',
}: PropsWithChildren<{ color?: string }>) {
  return (
    <li className="flex items-start gap-2">
      <span className={cn(`mt-2 h-1.5 w-1.5 shrink-0 rounded-full`, color)} />
      <p className="text-black-800 text-sm">{children}</p>
    </li>
  );
}

function InfoItem({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="mt-0.5">{icon}</div>
      <div className="flex flex-col gap-1">
        <span className="font-bold text-[15px] text-gray-800">{title}</span>
        {content}
      </div>
    </div>
  );
}
