import { Clock, Heart, MapPin, Phone, Share2 } from 'lucide-react';
import Image from 'next/image';
import type React from 'react';
import type { PropsWithChildren } from 'react';
import Header from '@/components/header/Header';
import { cn } from '@/lib/utils';

const MOCK_BENEFIT_DATA = {
  title: '비발디파크',
  subTitle: '강원도 홍천 스키 리조트',
  tag: '하나EZ BEST',
  mainImage:
    'https://images.unsplash.com/photo-1551698618-1fed5d978044?q=80&w=2070&auto=format&fit=crop',
  benefits: [
    { id: 'b1', text: '리프트 1일권 20% 할인 (최대 12,000원)' },
    { id: 'b2', text: '장비 렌탈 10% 추가 할인' },
    { id: 'b3', text: '주중/주말 모두 사용 가능' },
    { id: 'b4', text: '본인 포함 최대 4인까지 적용' },
  ],
  usage: {
    operatingHours: '평일 08:30 - 16:30 / 주말 08:00 - 17:00',
    customerPhone: '1588-4888',
    reservation: 'https://www.sonohotels.com/vivaldi',
  },
  precautions: [
    { id: 'p1', text: '본 혜택은 타 할인/쿠폰과 중복 사용이 불가합니다.' },
    { id: 'p2', text: '리프트권 구매 시 바코드를 제시해주세요.' },
    { id: 'p3', text: '현금 환불 및 재발급이 불가합니다.' },
    { id: 'p4', text: '기상 상황에 따라 운영이 중단될 수 있습니다.' },
    { id: 'p5', text: '성수기 및 특정일은 사용이 제한될 수 있습니다.' },
  ],
};

export default function BenefitDetailPage() {
  const data = MOCK_BENEFIT_DATA;

  return (
    <>
      <Header
        title="혜택"
        rightElement={
          <div className="flex gap-2">
            <button type="button" className="p-2 text-black-900">
              <Heart size={24} />
            </button>
            <button type="button" className="p-2 text-black-900">
              <Share2 size={24} />
            </button>
          </div>
        }
      />
      <div className="relative min-h-screen bg-white text-black-800">
        <main>
          <section className="px-6 py-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-black text-2xl">{data.title}</h2>
                <p className="mt-1 text-gray-500 text-sm">{data.subTitle}</p>
              </div>
              <span className="rounded-full bg-green-ez px-4 py-1.5 font-bold text-[12px] text-white shadow-sm">
                {data.tag}
              </span>
            </div>

            <div className="relative mt-6 h-28.75 w-full overflow-hidden rounded-xl">
              <Image
                src={data.mainImage}
                alt={data.title}
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
              {data.benefits.map(({ text, id }) => (
                <ListItem key={`benefit-${id}`} color="bg-green-ez">
                  {text}
                </ListItem>
              ))}
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
                  <p className="text-gray-600 text-sm">
                    {data.usage.operatingHours}
                  </p>
                }
              />
              <InfoItem
                icon={<Phone size={20} className="text-gray-400" />}
                title="고객센터"
                content={
                  <p className="text-gray-600 text-sm">
                    {data.usage.customerPhone}
                  </p>
                }
              />
              <InfoItem
                icon={<MapPin size={20} className="text-gray-400" />}
                title="예약 안내"
                content={
                  <a
                    href={data.usage.reservation}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-green-ez text-sm underline underline-offset-4"
                  >
                    {data.title} 예약하러 가기
                  </a>
                }
              />
            </div>
          </section>

          <hr className="h-2 border-none bg-gray-50" />

          <section className="px-6 py-8">
            <h3 className="mb-4 font-black text-lg">유의사항</h3>
            <ul className="space-y-2 text-[13px] text-gray-500 leading-relaxed">
              {data.precautions.map(({ id, text }) => (
                <ListItem key={`pre-${id}`}>{text}</ListItem>
              ))}
            </ul>
          </section>
        </main>

        <footer className="sticky bottom-0 left-0 w-full px-6 py-4">
          <button className="flex h-14 w-full items-center justify-center rounded-xl bg-green-ez font-bold text-lg text-white shadow-green-ez/20 shadow-lg transition-transform active:scale-[0.98]">
            하나 더 이지 카드 만들기
          </button>
        </footer>
      </div>
    </>
  );
}

function ListItem({
  children,
  color = 'bg-black-800',
}: PropsWithChildren<{ color?: string }>) {
  return (
    <li className="flex items-start gap-2">
      <span className={cn(`mt-2 h-1.5 w-1.5 shrink-0 rounded-full`, color)} />
      <p className="text-black-800 text-sm leading-snug">{children}</p>
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
