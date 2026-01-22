'use client';

import { Info, Plus } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { use, useEffect, useRef, useState } from 'react';

import Header from '@/components/header/Header';
import { DOCS_CARD_ITEMS } from '../../constants/docsCardItem';
import type { DocsProps } from '../../[docId]/page';
import ActionButton from '@/components/ui/ActionButton';

export default function DocsAddPage({ params }: DocsProps) {
  const { docId } = use(params);
  const doc = DOCS_CARD_ITEMS.find((item) => item.id === docId);

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);

  const isPdf = file?.type === 'application/pdf';
  const isImage = !!file?.type?.startsWith('image/');

  const handlePick = () => inputRef.current?.click();

  const MAX_FILE_SIZE = 5 * 1024 * 1024; //5MB : 파일 크기 제한
  // 파일 업로드 시 업데이트
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    if (selected && selected.size > MAX_FILE_SIZE) {
      //5MB
      alert('파일 크기는 5MB를 초과할 수 없습니다.');
      e.target.value = '';
      return;
    }
    setFile(selected);
  };

  const [previewUrl, setPreviewUrl] = useState<string>('');

  // 파일 변경 시 미리보기 URL 생성 및 이전 URL 해제
  useEffect(() => {
    if (!file) {
      setPreviewUrl('');
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const handleSubmit = () => {
    // 추후 DB 연결 예정
    router.push(`/docs/add/${docId}/done`);
  };

  return (
    <>
      <Header title={`${doc?.title ?? '서류'} 등록`} />
      <main className="min-h-dvh bg-white px-5 pt-10">
        <h2 className="mb-3 font-sans font-semibold text-[14px] text-black-900">
          서류 파일
        </h2>

        {/* 업로드 영역 */}
        <div className="flex h-105 w-full flex-col items-center justify-center rounded-2xl border-2 border-black/20 bg-gray-100/70">
          <button
            type="button"
            onClick={handlePick}
            className="flex w-full flex-col items-center justify-center px-4 py-10 text-center transition-transform duration-150 active:scale-90"
          >
            {previewUrl ? (
              // 파일 업로드 시 미리 보기 영역
              <div className="relative h-80 w-full overflow-hidden rounded-xl bg-white">
                {isImage ? (
                  // 이미지일떄
                  <Image
                    src={previewUrl}
                    alt="preview"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                ) : isPdf ? (
                  // pdf일때
                  <iframe
                    title="pdf-preview"
                    src={previewUrl}
                    className="h-full w-full"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center px-4">
                    <p className="font-sans text-[13px] text-black/60">
                      미리보기를 지원하지 않는 파일 형식입니다.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              // 파일 미업로드 시 안내 영역
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

        {/* 실제 파일 input */}
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,application/pdf"
          className="hidden"
          onChange={handleChange}
        />

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
            <li>JPG, PNG, PDF 형식만 가능합니다</li>
            <li>최대 5MB까지 업로드 가능합니다</li>
          </ul>
        </div>

        <div className="mt-6">
          <ActionButton
            text="등록하기"
            onClick={handleSubmit}
            disabled={!file}
            className="mt-6"
          />
        </div>
      </main>
    </>
  );
}
