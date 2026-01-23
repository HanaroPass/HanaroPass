'use client';

import { ChevronDown, ChevronUp, X } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import Header from '@/components/header/Header';
import ActionButton from '@/components/ui/ActionButton';
import { Button } from '@/components/ui/button';

type IntroStepProps = {
  onSelectIdentityType: (type: 'passport' | 'alien') => void;
  onClose: () => void;
};

export default function IntroStep({
  onSelectIdentityType,
  onClose,
}: IntroStepProps) {
  const [isAgreed, setIsAgreed] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const guideRef = useRef<HTMLDivElement>(null);

  const handleGuideToggle = () => {
    setIsGuideOpen((prev) => {
      const newState = !prev;

      // 가이드가 열릴 때만 스크롤
      if (newState && guideRef.current) {
        requestAnimationFrame(() => {
          guideRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        });
      }

      return newState;
    });
  };

  return (
    <>
      <Header
        title="신분증 등록"
        rightElement={
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="p-2 text-black-900 transition-opacity active:opacity-50"
            aria-label="닫기"
          >
            <X size={24} />
          </Button>
        }
      />

      <div className="flex min-h-[calc(100vh-60px)] flex-col bg-white p-4 pb-1 sm:p-6 sm:pb-10 lg:p-8">
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col sm:max-w-md sm:flex-none lg:max-w-lg xl:max-w-2xl">
          <div className="shrink-0">
            <div className="mb-6 sm:mb-8">
              <h2 className="font-semibold text-gray-800 text-xl">
                인증서 발급을 위해
              </h2>
              <p className="font-semibold text-gray-800 text-xl">
                신분증을 준비해 주세요.
              </p>
            </div>

            <div className="relative mb-10 rounded-lg bg-white p-4 sm:mb-8 sm:p-6 lg:p-8">
              <div className="relative flex h-60 w-full items-center justify-center sm:h-48 md:h-56">
                <Image
                  src="/images/identity/identity_img.svg"
                  alt="신분증 스캔 이미지"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="mb-12 space-y-4 sm:mb-6 sm:space-y-3">
              <ActionButton
                text="여권"
                onClick={() => onSelectIdentityType('passport')}
                className="border border-green-ez bg-white text-green-ez hover:bg-green-ez/10"
              />

              <ActionButton
                text="외국인등록증"
                onClick={() => onSelectIdentityType('alien')}
                className="border border-green-ez bg-white text-green-ez hover:bg-green-ez/10"
              />
            </div>
          </div>

          <div className="mt-auto pt-2 sm:mt-20 sm:pt-8">
            <div className="mb-4 w-full rounded-xl border border-gray-200 border-b bg-silver-400 px-3 py-4 sm:px-4 sm:py-6">
              <label className="flex cursor-pointer items-center justify-between">
                <span className="font-medium text-black-800 text-sm sm:text-base">
                  전자문서 저장 동의
                </span>
                <input
                  type="checkbox"
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                  className="h-5 w-5 rounded border border-gray-300 text-green-ez focus:ring-green-ez/50"
                  style={{
                    accentColor: '#01a5ac',
                  }}
                />
              </label>
            </div>

            <div
              ref={guideRef}
              className="scroll-mt-20 border-gray-200 border-t pt-2 transition-all duration-300"
            >
              <Button
                variant="ghost"
                onClick={handleGuideToggle}
                className="flex h-auto w-full items-center justify-between px-0 py-3 text-gray-600 text-sm hover:bg-transparent"
              >
                <span>이용안내</span>
                {isGuideOpen ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </Button>

              {isGuideOpen && (
                <div className="fade-in slide-in-from-top-2 mt-4 animate-in px-2 font-normal text-gray-800 text-sm">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 shrink-0 select-none text-gray-400">
                        •
                      </span>
                      <span className="leading-relaxed">
                        하나인증서는 국세청, 정부 24, 본인확인 등에 이용할 수
                        있습니다.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 shrink-0 select-none text-gray-400">
                        •
                      </span>
                      <span className="leading-relaxed">
                        분실/도난/유효기간 만료/사진훼손 등 정상인식이 불가능한
                        신분증은 이용할 수 없습니다.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 shrink-0 select-none text-gray-400">
                        •
                      </span>
                      <span className="leading-relaxed">
                        신분증 발급기관에서 검증되지 않는 신분증은 거부될 수
                        있습니다.
                      </span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
