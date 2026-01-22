'use client';

import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { DOCS_CARD_ITEMS } from '../constants/docsCardItem';
import { use } from 'react';
import Header from '@/components/header/Header';

type DocsDetailProps = {
  params: Promise<{ docId: string }>;
};

export default function DocsDetailPage({ params }: DocsDetailProps) {
  const { docId } = use(params);
  const doc = DOCS_CARD_ITEMS.find((item) => item.id === docId);

  return (
    <>
      <Header title={doc?.title} />
      <main className="min-h-dvh bg-green-400 pt-25">
        {/* 중앙 카드 */}
        <div className="mx-auto w-full max-w-84">
          <div className="rounded-2xl bg-white shadow-[0_5px_10px_rgba(0,0,0,0.18)]">
            <div className="flex h-105 flex-col items-center justify-center px-6">
              <FileText className="h-10 w-10 text-gray-300" />
              <h2 className="mt-4 font-sans font-semibold text-[16px] text-black-900">
                {doc?.title}
              </h2>

              <p className="mt-3 text-center font-sans text-[12px] text-black/45 leading-[1.4]">
                전자서명법 기준을 준수한 안전한 인증서
              </p>
              <p className="mt-1 font-sans font-semibold text-[13px] text-black/35">
                2026. 10. 25.까지
              </p>
            </div>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="mx-auto mt-10 flex w-full max-w-84 gap-4">
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={() => {
              alert('삭제 기능 연결 예정');
            }}
          >
            삭제
          </Button>
          <Button
            size="lg"
            className="flex-1 bg-green-ez text-white hover:bg-green-ez/90"
            onClick={() => {
              alert('다운로드 기능 연결 예정');
            }}
          >
            다운로드
          </Button>
        </div>
      </main>
    </>
  );
}
