import Image from 'next/image';
import { DOCS_CARD_ITEMS } from '../constants/docsCardItem';
import Header from '@/components/header/Header';
import { getUserDocs } from '../actions/userDocs';
import DocsDetailPageClient from './docsDetailPageClient';
import DocsPreviewClient from './docsPreviewClient';

export type DocsProps = {
  params: Promise<{ docId: string }>;
};

export default async function DocsDetailPage({ params }: DocsProps) {
  const { docId } = await params;

  const doc = DOCS_CARD_ITEMS.find((item) => item.id === docId);

  // DB에서 저장된 서류 정보 가져오기
  const userDoc = await getUserDocs(docId);
  const fileUrl = userDoc?.fileUrl ?? '';

  return (
    <>
      <Header title={doc?.title ?? '서류'} />
      <main className="min-h-dvh bg-green-400 pt-25">
        {/* 중앙 카드 */}
        <div className="mx-auto w-full max-w-84">
          <div className="rounded-2xl bg-white shadow-[0_5px_10px_rgba(0,0,0,0.18)]">
            <div className="flex h-105 flex-col items-center justify-center px-6">
              <DocsPreviewClient
                fileUrl={fileUrl}
                title={doc?.title ?? 'document-preview'}
              />
              <div className="mt-2 mb-8 flex flex-col items-center text-center">
                <p className="text-center font-sans text-[10px] text-black/45 leading-[1.4]">
                  전자서명법 기준을 준수한 안전한 인증서
                </p>
                <p className="font-sans font-semibold text-[11px] text-black/35">
                  2026. 10. 25.까지
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 버튼 영역 */}
        <DocsDetailPageClient
          docId={docId}
          fileUrl={fileUrl}
          title={doc?.title ?? '서류'}
        />
      </main>
    </>
  );
}
