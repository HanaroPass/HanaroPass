'use client';

import { useRouter, useSearchParams } from 'next/navigation';
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

  // 진입 경로 확인
  const isFromDocs = searchParams.get('step') === 'result';

  // URL에 ?step=result가 있으면 해당 스텝으로
  const stepParam = searchParams.get('step');
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

  const handleClose = () => {
    // 서류 보관함에서 바로 결과 페이지로 온 경우 -> 보관함 메인으로 이동
    if (isFromDocs) {
      router.push('/docs'); // 혹은 보관함 주소
      return;
    }

    // 일반적인 등록 프로세스 중인 경우
    if (currentStep !== 'intro') {
      // 등록 중이었다면 인트로 단계로 후퇴
      history.push('intro');
    } else {
      // 인트로 단계에서 X를 눌렀다면 메인 페이지로 이동
      router.push('/');
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
        onSubmit={async (data) => {
          try {
            const formData = new FormData();
            if (context.identityData) {
              Object.entries(context.identityData).forEach(([k, v]) => {
                formData.append(k, v as string);
              });
            }
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

  // Result Step
  if (currentStep === 'result') {
    return (
      <ResultStep
        identityType={context.identityType}
        identityData={context.identityData}
        onClose={handleClose}
        onRegister={() => {
          // intro로 이동하여 새로운 등록 시작
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
