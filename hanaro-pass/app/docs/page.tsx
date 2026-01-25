import { Suspense } from 'react';
import { getDocsStatus, getUserName } from './actions/userDocsList';
import DocsPageClient from './docsPageClient';

export default function DocsPage() {
  return (
    <main>
      <Suspense fallback={<div className="p-5 text-white/50">로딩 중...</div>}>
        <DocsPageContent />
      </Suspense>
    </main>
  );
}

async function DocsPageContent() {
  const [userName, docStatus] = await Promise.all([
    getUserName(),
    getDocsStatus(),
  ]);

  return <DocsPageClient userName={userName ?? ''} docStatus={docStatus} />;
}
