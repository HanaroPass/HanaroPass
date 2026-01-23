import { Suspense } from 'react';
import HospitalRegistrationCompleteClient from './HospitalRegistrationCompleteClient';

export default function HospitalRegistrationCompletePage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          로딩 중...
        </div>
      }
    >
      <HospitalRegistrationCompleteClient />
    </Suspense>
  );
}
