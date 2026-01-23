import { getDocsStatus, getUserName } from './actions/userDocsList';
import DocsPageClient from './docsPageClient';

export const dynamic = 'force-dynamic';

export default async function docsPage() {
  const [userName, docStatus] = await Promise.all([
    getUserName(),
    getDocsStatus(),
  ]);
  return <DocsPageClient userName={userName ?? ''} docStatus={docStatus} />;
}
