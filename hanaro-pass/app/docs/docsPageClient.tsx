'use client';
import { useMemo, useState } from 'react';
import DocsCardStack from './components/main/DocsCardStack';
import BottomSheet from './components/add/BottomSheet';
import {
  DOC_ID_TO_REQUIREMENT,
  DOCS_CARD_ITEMS,
} from './constants/docsCardItem';
import Header from '@/components/header/Header';
import DocsSelectList from './components/add/BottomSelectList';
import { useRouter } from 'next/navigation';
import type { getDocsStatus } from './actions/userDocsList';
import { setupTestSession } from './actions/test';

type UserProps = {
  userName: string;
  docStatus: Awaited<ReturnType<typeof getDocsStatus>>;
};

export default function DocsPageClient({ userName, docStatus }: UserProps) {
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // docStatus 기반으로 보유한 서류만 필터
  const ownedItems = useMemo(() => {
    if (!docStatus) return [];

    return DOCS_CARD_ITEMS.filter((item) => {
      const req = DOC_ID_TO_REQUIREMENT[item.id];

      if (req.kind === 'PASSPORT') return docStatus.hasPassport;
      if (req.kind === 'ARC') return docStatus.hasARC;
      return docStatus.hasDocType[req.docType];
    });
  }, [docStatus]);

  // 바텀시트는 유저가 가지고있지 않은 서류만 보여주기
  const addableItems = useMemo(() => {
    const ownedSet = new Set(ownedItems.map((i) => i.id));
    return DOCS_CARD_ITEMS.filter((i) => !ownedSet.has(i.id));
  }, [ownedItems]);

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

          {/* 🔴 임시 테스트 버튼 */}
          <button
            type="button"
            onClick={async () => {
              try {
                await setupTestSession('P-2');
                alert('테스트 로그인 성공! 페이지를 새로고침합니다.');
                window.location.reload(); // 세션 반영을 위해 강제 새로고침
              } catch (e) {
                alert('로그인 실패: ' + e);
              }
            }}
            className="rounded-3xl bg-red-500 px-3.5 py-1 font-sans font-semibold text-[14px] text-white"
          >
            🛠️ 세션 생성
          </button>
          {/* 🔴 임시 테스트 버튼 */}

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
          <DocsCardStack userName={userName} items={ownedItems} />
        </div>

        {/* 바텀시트 */}
        <BottomSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)}>
          {addableItems.length > 0 ? (
            <DocsSelectList
              items={addableItems}
              onSelect={(id) => {
                console.log('selected:', id);
                setIsSheetOpen(false);
                router.push(`/docs/add/${id}`);
              }}
            />
          ) : null}
        </BottomSheet>
      </main>
    </>
  );
}
