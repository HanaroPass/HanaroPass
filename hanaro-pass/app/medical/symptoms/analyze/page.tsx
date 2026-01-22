'use client';
import { Loader, PlusIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
import { type ChangeEvent, useState } from 'react';
import ActionButton from '@/components/header/ActionButton';
import { postSymptomForm } from '../../actions/symptoms';
import SymptomRadioGroup from '../../components/symptom/SymptomRadioGroup';

export default function SymptomAnalyzePage() {
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(false);
  const handleImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const images = Array.from(e.target.files);
      setImages(images);

      const urls = images.map((i) => URL.createObjectURL(i));
      setImageUrls(urls);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const response = await postSymptomForm(formData);

    setLoading(false);
    console.log(response);
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex h-44 w-44 items-center justify-center rounded-4xl bg-black/60 pt-8 text-white">
          <div className="flex flex-col items-center justify-center text-center font-medium">
            <div>AI가 진단하고 있습니다.</div>
            <div>잠시만 기다려주세요.</div>
            <Loader className="white m-2 h-8 w-8 animate-spin" />
          </div>
          <div className="flex items-center justify-center"></div>
        </div>
      )}
      <div className="px-8">
        <div className="my-7 h-48 rounded-xl bg-green-300 p-5">
          <div className="pb-2 font-semibold text-sm text-teal-600 leading-5">
            혹시 작성이 어렵나요?
          </div>
          <div className="mb-2 h-14 w-full rounded-lg bg-white-ez pt-3 pl-3">
            <div className="justify-center pb-[7px] font-medium text-black_900 text-xs leading-4">
              TIP 01. 증상이라면
            </div>
            <div className="justify-center font-medium text-[8px] text-black_900 leading-3">
              언제부터 증상이 있었는지, 어느 부위가 아픈지를 중심으로
              적어주세요.
            </div>
          </div>
          <div className="h-14 w-full rounded-lg bg-white-ez pt-3 pl-3">
            <div className="justify-center pb-[7px] font-medium text-black-900 text-xs leading-4">
              TIP 02. 시술이라면
            </div>
            <div className="justify-center font-medium text-[8px] text-black-900 leading-3">
              어떤 시술을 받고 싶은지, 희망 날짜나 목적이 있다면 함께
              적어주세요.
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="font-medium text-base leading-6">
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
            required
            placeholder={`ex)\n어제부터 갑자기 배가 아프기 시작했어요.\n누가 배를 콕콕콕 찌르는 것 같이 아파요.`}
          />
          <div className="pt-5 font-medium text-base leading-6">
            {' '}
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
                <div className="mr-3 mb-11 flex h-28 w-28 items-center justify-center border-2 border-gray-100 bg-gray-200">
                  <PlusIcon className="h-11 w-11 text-gray-400" />
                </div>
              </label>
            ) : (
              <div className="mr-3 mb-11 flex h-28 w-28 shrink-0 items-center justify-center border-2 border-gray-100 bg-gray-200">
                <XIcon
                  onClick={() => {
                    setImages([]);
                    setImageUrls([]);
                  }}
                  className="h-11 w-11 text-gray-400"
                />
              </div>
            )}
            {imageUrls.map((url) => (
              <div
                className="relative mr-3 h-28 w-28 shrink-0 overflow-hidden rounded-[10px]"
                key={url}
              >
                <Image src={url} alt="preview" fill className="object-cover" />
              </div>
            ))}
          </div>
          <ActionButton text="다 입력했어요" onClick={() => {}} />
        </form>
      </div>
    </>
  );
}
