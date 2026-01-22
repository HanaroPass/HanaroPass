'use client';
import { Plus, Info } from 'lucide-react';
import Header from '@/components/header/Header';
import ActionButton from '@/components/header/ActionButton';
import type { DocsProps } from '../../[docId]/page';
import { use } from 'react';
import { DOCS_CARD_ITEMS } from '../../constants/docsCardItem';

export default function DocsAddPage({ params }: DocsProps) {
  const { docId } = use(params);
  const doc = DOCS_CARD_ITEMS.find((item) => item.id === docId);

  return (
    <>
      <Header title={`${doc?.title} 등록`} />
      <main className="min-h-dvh bg-white px-5 pt-10">
        <h2 className="mb-3 font-sans font-semibold text-[14px] text-black-900">
          서류 파일
        </h2>

        {/* 업로드 영역 */}
        <div className="flex h-105 w-full flex-col items-center justify-center rounded-2xl border-2 border-black/20 bg-gray-100/70">
          <Plus size={34} className="mb-6 text-gray-400" />

          <p className="font-sans font-semibold text-[15px] text-black-800">
            파일을 업로드하세요
          </p>
          <p className="mt-2 font-sans text-[13px] text-black-600">
            또는 <span className="underline">여기</span>를 클릭하세요
          </p>
        </div>

        {/* 안내사항 */}
        <div className="mt-5 rounded-2xl bg-[#EAF9FB] p-4">
          <div className="mb-2 flex items-center gap-2">
            <Info size={18} className="text-green-ez" />
            <p className="font-sans font-semibold text-[14px] text-green-ez">
              안내사항
            </p>
          </div>

          <ul className="ml-5 list-disc space-y-1 font-sans text-[13px] text-green-ez">
            <li>선명한 이미지를 업로드해 주세요</li>
            <li>JPG, PNG 형식만 가능합니다</li>
            <li>최대 5MB까지 업로드 가능합니다</li>
          </ul>
        </div>

        <div className="mt-6">
          <ActionButton
            text="등록하기"
            onClick={() => {
              alert('파일 업로드 기능 연결 예정');
            }}
            className="mt-6"
          />
        </div>
      </main>
    </>
  );
}
