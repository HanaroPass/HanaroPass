'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useFunnel } from './hooks/useFunnel';
import OCRPageContent from './ocr/OCRPageContent';
import AccountStep from './steps/AccountStep';
import IntroStep from './steps/IntroStep';
import ResultStep from './steps/ResultStep';
import { saveArcData } from './actions/saveArc';
import { useToast } from '@/hooks/useToast';

export type IdentityType = 'passport' | 'arc';

export default function IdentityPageClient() {
  const { actionError, systemError } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  const stepParam = searchParams.get('step');
  const isFromDocs = searchParams.get('from') === 'docs';

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

    if (isFromDocs) {
      params.set('from', 'docs');
    }

    const queryString = params.toString() ? `?${params.toString()}` : '';
    const newUrl = `${window.location.pathname}${queryString}`;

    router.replace(newUrl, { scroll: false });
  }, [currentStep, isFromDocs, router]);

  const handleClose = () => {
    if (isFromDocs) {
      router.replace('/docs');
      return;
    }

    if (currentStep === 'result') {
      router.replace('/');
      return;
    }

    if (currentStep !== 'intro') {
      history.push('intro');
    } else {
      router.replace('/');
    }
  };

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

  if (currentStep === 'account') {
    return (
      <AccountStep
        onSubmit={async (data) => {
          try {
            if (!context.identityData) {
              systemError('신분증 정보 등록');
              return;
            }
            const formData = new FormData();
            Object.entries(context.identityData).forEach(([k, v]) => {
              if (v !== undefined && v !== null) {
                formData.append(k, String(v));
              }
            });
            // 계좌 단계에서 db 저장
            const res = await saveArcData(null, formData);
            if (res.success) {
              // 성공 시 결과 페이지로 이동
              history.push('result', {
                accountData: data,
                identityData: context.identityData,
              });
            } else {
              actionError(res);
            }
          } catch {
            systemError('신분증 정보 등록');
          }
        }}
        onClose={handleClose}
      />
    );
  }

  if (currentStep === 'result') {
    return (
      <ResultStep
        identityType={context.identityType}
        identityData={context.identityData}
        onClose={handleClose}
        onRegister={() => {
          router.push('/identity');
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
