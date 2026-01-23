'use client';

import { useRouter } from 'next/navigation';
import { useFunnel } from './hooks/useFunnel';
import OCRPageContent from './ocr/OCRPageContent';
import AccountStep from './steps/AccountStep';
import IntroStep from './steps/IntroStep';
import ResultStep from './steps/ResultStep';

export default function IdentityPage() {
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
    if (currentStep !== 'intro') {
      history.push('intro');
    } else {
      router.back();
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
        accountData={context.accountData}
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
