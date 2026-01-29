'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useFunnel } from './hooks/useFunnel';
import OCRPageContent from './ocr/OCRPageContent';
import AccountStep from './steps/AccountStep';
import IntroStep from './steps/IntroStep';
import ResultStep from './steps/ResultStep';

export type IdentityType = 'passport' | 'arc';

export default function IdentityPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const stepParam = searchParams.get('step');
  const isFromDocs =
    searchParams.get('from') === 'docs' || stepParam === 'result';

  const initialStep =
    stepParam === 'result' || stepParam === 'ocr' || stepParam === 'account'
      ? stepParam
      : 'intro';
  const initialType = searchParams.get('type') as IdentityType;

  const { currentStep, context, history } = useFunnel({
    step: initialStep,
    context: {
      identityType: initialType,
      identityData: null,
      accountData: null,
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (currentStep === 'intro') {
      params.delete('step');
    } else {
      params.set('step', currentStep);
    }

    const queryString = params.toString() ? `?${params.toString()}` : '';
    const newUrl = `${window.location.pathname}${queryString}`;

    window.history.replaceState(null, '', newUrl);
  }, [currentStep]);

  const handleClose = () => {
    if (isFromDocs) {
      router.replace('/docs');
      return;
    }

    if (currentStep !== 'intro') {
      history.push('intro');
    } else {
      router.replace('/');
    }
  };

  // Intro Step
  if (currentStep === 'intro') {
    return (
      <IntroStep
        onSelectIdentityType={(type) => {
          history.push('ocr', {
            identityType: type,
            identityData: null,
            accountData: null,
          });
        }}
        onClose={handleClose}
      />
    );
  }

  // OCR Step
  if (currentStep === 'ocr') {
    return (
      <OCRPageContent
        type={context.identityType}
        onSubmit={(data) => {
          if (context.identityType === 'passport') {
            history.push('result', { identityData: data, accountData: null });
          } else {
            history.push('account', { identityData: data, accountData: null });
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
          history.push('result', {
            accountData: data,
            identityData: context.identityData,
          });
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
        onClose={handleClose}
        onRegister={() => {
          router.replace('/identity');
          history.push('intro', {
            identityType: null,
            identityData: null,
            accountData: null,
          });
        }}
      />
    );
  }

  return null;
}
