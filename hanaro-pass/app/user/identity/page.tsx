'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Header from '@/components/header/Header';
import ActionButton from '@/components/ui/ActionButton';
import { Button } from '@/components/ui/button';
import { useFunnel } from './hooks/useFunnel';

import OCRPageContent from './ocr/OCRPageContent';
import AccountStep from './steps/AccountStep';
import ResultStep from './steps/ResultStep';

export default function IdentityPage() {
  const [isAgreed, setIsAgreed] = useState(false);
  const router = useRouter();

  const { currentStep, context, history } = useFunnel({
    step: 'intro',
    context: {
      identityType: null,
      identityData: null,
      accountData: null,
    },
  });

  const handleClose = () => {
    router.back();
  };

  // Intro Step
  if (currentStep === 'intro') {
    return (
      <>
        <Header
          title="신분증 등록"
          rightElement={
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
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
                  onClick={() => {
                    history.push('ocr', {
                      identityType: 'passport',
                    });
                  }}
                  className="border border-green-ez bg-white text-green-ez hover:bg-green-ez/10"
                />

                <ActionButton
                  text="외국인등록증"
                  onClick={() => {
                    history.push('ocr', {
                      identityType: 'alien',
                    });
                  }}
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
            </div>
          </div>
        </div>
      </>
    );
  }

  // OCR Step
  if (currentStep === 'ocr') {
    return (
      <OCRPageContent
        type={context.identityType}
        onSubmit={(data) => {
          if (context.identityType === 'passport') {
            history.push('result', { identityData: data });
          } else {
            history.push('account', { identityData: data });
          }
        }}
        onClose={handleClose}
      />
    );
  }

  // Account Step
  if (currentStep === 'account') {
    return (
      <AccountStep
        onSubmit={(data) => {
          history.push('result', { accountData: data });
        }}
        onClose={handleClose}
      />
    );
  }

  // Result Step
  if (currentStep === 'result') {
    return (
      <ResultStep
        identityType={context.identityType}
        identityData={context.identityData}
        accountData={context.accountData}
        onClose={handleClose}
      />
    );
  }

  return null;
}
