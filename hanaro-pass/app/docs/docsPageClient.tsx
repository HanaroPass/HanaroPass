'use client';
import { useState } from 'react';
import DocsCardStack from './components/main/DocsCardStack';
import BottomSheet from './components/add/BottomSheet';
import { DOCS_CARD_ITEMS } from './constants/docsCardItem';
import Header from '@/components/header/Header';
import DocsSelectList from './components/add/BottomSelectList';
import { useRouter } from 'next/navigation';

export type userProps = {
  userName: string;
};

export default function DocsPageClient({ userName }: userProps) {
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <>
      <Header title="서류 보관함" />
      <main className="relative min-h-dvh bg-linear-to-br from-(--color-green-ez) to-[#89D5D8] px-5 pt-4">
        {/* 상단 타이틀 */}
        <header className="mb-10">
          <h1 className="font-hana font-semibold text-[14px] text-white/90 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
            Hana EZ Document
          </h1>
        </header>
        {/* 보유 + 추가 버튼 */}
        <div className="mb-3 flex items-center justify-between text-white">
          <h2 className="font-sans font-semibold text-[16px]">보유</h2>
          <button
            type="button"
            onClick={() => setIsSheetOpen(true)}
            className="rounded-3xl border border-white/70 px-3.5 py-1 font-sans font-semibold text-[14px] transition-transform active:scale-95 active:opacity-80"
          >
            + 추가
          </button>
        </div>
        {/* 카드 아코디언 */}
        <div className="pb-10">
          <DocsCardStack userName={userName} />
        </div>

        {/* 바텀시트 */}
        <BottomSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)}>
          <DocsSelectList
            items={DOCS_CARD_ITEMS}
            onSelect={(id) => {
              console.log('selected:', id);
              setIsSheetOpen(false);
              router.push(`/docs/add/${id}`);
            }}
          />
        </BottomSheet>
      </main>
    </>
  );
}
