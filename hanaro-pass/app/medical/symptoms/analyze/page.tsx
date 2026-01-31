'use client';
import { Loader, PlusIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
import ActionButton from '@/components/ui/ActionButton';
import AnalysisTip from '../../components/symptom/AnalysisTip';
import SymptomRadioGroup from '../../components/symptom/SymptomRadioGroup';
import { useImageUpload } from '../../hooks/useImageUpload';
import useSymptomResult from '../../hooks/useSymptomResult';

export default function SymptomAnalyzePage() {
  const { images, imageUrls, handleImages, removeImage, clearImages } =
    useImageUpload();
  const { isLoading, handleSubmit } = useSymptomResult(images);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="flex h-44 w-44 flex-col items-center justify-center gap-2 rounded-4xl bg-black/60 text-center font-medium text-sm text-white">
            <div>AI가 진단하고 있습니다.</div>
            <div>잠시만 기다려주세요.</div>
            <Loader className="h-8 w-8 animate-spin text-white" />
          </div>
        </div>
      )}
      <div className="px-8">
        <AnalysisTip />
        <form onSubmit={handleSubmit}>
          <div className="mb-2 font-medium text-base leading-6">
            증상/시술을 선택해주세요.<span className="text-orange-400">*</span>
          </div>
          <SymptomRadioGroup />
          <div className="pt-5 pb-3 font-medium text-base leading-6">
            구체적인 설명을 입력해주세요.
            <span className="text-orange-400">*</span>
          </div>
          <textarea
            className="h-64 w-full resize-none rounded-[10px] bg-gray-200 px-4 py-3 placeholder:font-normal placeholder:text-black-800 placeholder:leading-6"
            name="description"
            rows={6}
            placeholder={`ex)\n어제부터 갑자기 배가 아프기 시작했어요.\n누가 배를 콕콕콕 찌르는 것 같이 아파요.`}
          />
          <div className="pt-5 font-medium text-base leading-6">
            관련 사진을 첨부해주세요. ({images.length}/3)
          </div>
          <div className="no-scrollbar flex overflow-x-auto pt-3">
            {images.length < 3 ? (
              <label>
                <input
                  type="file"
                  name="images"
                  multiple
                  accept="image/*"
                  onChange={handleImages}
                  className="hidden"
                />
                <div className="mr-3 mb-11 flex h-28 w-28 items-center justify-center rounded-[10px] border-2 border-gray-100 bg-gray-200">
                  <PlusIcon className="h-11 w-11 text-gray-400" />
                </div>
              </label>
            ) : (
              <div className="mr-3 mb-11 flex h-28 w-28 shrink-0 items-center justify-center border-2 border-gray-100 bg-gray-200">
                <XIcon
                  onClick={clearImages}
                  className="h-11 w-11 text-gray-400"
                />
              </div>
            )}
            {imageUrls.map((url, idx) => (
              <div
                className="relative mr-3 h-28 w-28 shrink-0 overflow-hidden rounded-[10px]"
                key={url}
              >
                <Image src={url} alt="preview" fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-1 right-1 rounded-full bg-white p-1 shadow"
                >
                  <XIcon className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            ))}
          </div>
          <ActionButton
            text="다 입력했어요"
            className="mb-9 h-14"
            onClick={() => {}}
          />
        </form>
      </div>
    </>
  );
}
