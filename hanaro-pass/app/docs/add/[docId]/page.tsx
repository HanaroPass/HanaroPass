'use client';

import { Info, Plus } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { use, useRef, useState } from 'react';

import Header from '@/components/header/Header';
import { DOCS_CARD_ITEMS } from '../../constants/docsCardItem';
import type { DocsProps } from '../../[docId]/page';
import ActionButton from '@/components/ui/ActionButton';
import { useFilePreview } from '../../hooks/useFilePreview';
import {
  DOC_ID_TO_REQUIREMENT,
  type DocsCardId,
} from '../../constants/docsCardItem';
import { addUserDocs } from '../../actions/addUserDocs';

export default function DocsAddPage({ params }: DocsProps) {
  const { docId } = use(params);
  const doc = DOCS_CARD_ITEMS.find((item) => item.id === docId);

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { file, previewUrl, isPdf, isImage, setSelectedFile } =
    useFilePreview();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePick = () => inputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    const res = setSelectedFile(selected);

    if (!res.ok) {
      alert(res.error);
      e.target.value = '';
    }
  };

  const handleSubmit = async () => {
    if (!file || isSubmitting) return;

    const req = DOC_ID_TO_REQUIREMENT[docId as DocsCardId];
    if (req.kind !== 'USER_DOC') {
      alert('이 서류는 현재 등록 방식(UserDocument 저장)을 지원하지 않습니다.');
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('docType', req.docType);

      const result = await addUserDocs(formData);

      if (result.success) {
        // 저장 일시 저장해놓기 ( 다음 완료 화면에서 필요 )
        sessionStorage.setItem(
          'createdAt',
          result.data.createdAt.toISOString(),
        );
        router.push(`/docs/add/${docId}/done`);
      } else {
        alert(result.message);
        setIsSubmitting(false);
      }
    } catch (e) {
      console.error(e);
      alert('네트워크 오류가 발생했습니다.');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header title={`${doc?.title ?? '서류'} 등록`} />
      <main className="min-h-dvh bg-white px-5 pt-10">
        <h2 className="mb-3 font-sans font-semibold text-[14px] text-black-900">
          서류 파일
        </h2>

        <div className="flex h-105 w-full flex-col items-center justify-center rounded-2xl border-2 border-black/20 bg-gray-100/70">
          <button
            type="button"
            onClick={handlePick}
            disabled={isSubmitting} // 업로드 중엔 클릭 방지
            className="flex w-full flex-col items-center justify-center px-4 py-10 text-center transition-transform duration-150 active:scale-90 disabled:opacity-50"
          >
            {previewUrl ? (
              <div className="relative h-80 w-full overflow-hidden rounded-xl bg-white">
                {isImage ? (
                  <Image
                    src={previewUrl}
                    alt="preview"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                ) : isPdf ? (
                  <iframe
                    title="pdf-preview"
                    src={previewUrl}
                    className="h-full w-full"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center px-4">
                    <p className="font-sans text-[13px] text-black/60">
                      미리보기를 지원하지 않습니다.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Plus size={34} className="mb-6 text-gray-400" />
                <p className="font-sans font-semibold text-[15px] text-black-800">
                  파일을 업로드하세요
                </p>
                <p className="mt-2 font-sans text-[13px] text-black-600">
                  또는 여기를 클릭하세요
                </p>
              </>
            )}
          </button>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,application/pdf"
          className="hidden"
          onChange={handleChange}
        />

        <div className="mt-5 rounded-2xl bg-[#EAF9FB] p-4">
          <div className="mb-2 flex items-center gap-2">
            <Info size={18} className="text-green-ez" />
            <p className="font-sans font-semibold text-[14px] text-green-ez">
              안내사항
            </p>
          </div>
          <ul className="ml-5 list-disc space-y-1 font-sans text-[13px] text-green-ez">
            <li>선명한 이미지를 업로드해 주세요</li>
            <li>JPG, PNG, PDF 형식만 가능합니다</li>
            <li>최대 5MB까지 업로드 가능합니다</li>
          </ul>
        </div>

        <div className="mt-6">
          <ActionButton
            text={isSubmitting ? '업로드 중...' : '등록하기'} // 상태에 따른 텍스트 변경
            onClick={handleSubmit}
            disabled={!file || isSubmitting} // 파일이 없거나 업로드 중일 때 비활성화
            className="mt-6"
          />
        </div>
      </main>
    </>
  );
}
