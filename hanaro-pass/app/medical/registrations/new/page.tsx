import { Suspense } from 'react';
import LanguageRegistrationClient from './LanguageRegistrationClient';

export default function LanguageRegistrationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          로딩 중...
        </div>
      }
    >
      <LanguageRegistrationClient />
    </Suspense>
  );
}
