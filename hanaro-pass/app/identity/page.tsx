import { Suspense } from 'react';
import IdentityPageClient from './IdentityPageClient';

export default function IdentityPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-dvh items-center justify-center">로딩 중...</div>
      }
    >
      <IdentityPageClient />
    </Suspense>
  );
}
