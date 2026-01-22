'use client';

import type { DocsProps } from '@/app/docs/[docId]/page';
import { DOCS_CARD_ITEMS } from '@/app/docs/constants/docsCardItem';
import Header from '@/components/header/Header';
import RegistrationSummary from '@/components/result/RegistrationSummary';
import ActionButton from '@/components/ui/ActionButton';
import { useRouter } from 'next/navigation';
import { use } from 'react';

export default function DocsDonePage({ params }: DocsProps) {
  const router = useRouter();
  const { docId } = use(params);
  const doc = DOCS_CARD_ITEMS.find((item) => item.id === docId);
  return (
    <>
      <Header title={`${doc?.title} 등록 완료`} />
      <main className="min-h-dvh bg-white pb-10">
        <RegistrationSummary
          title="서류 저장이 완료되었습니다"
          description={'등록된 전자증명서는\n바로 확인할 수 있어요'}
          items={[
            { label: '신청문서', value: doc?.title ?? '' },
            { label: '신청일시', value: '2026.01.19 08:53:55' },
            { label: '발급기관', value: '정부24' },
          ]}
        />

        {/* 하단 버튼 */}
        <div className="mt-43 px-5">
          <ActionButton
            text="저장 내역"
            onClick={() => {
              router.push(`/docs`);
            }}
          />
        </div>
      </main>
    </>
  );
}
