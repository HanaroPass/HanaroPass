import { getDocsStatus, getUserName } from './actions/userDocsList';
import DocsPageClient from './docsPageClient';

export default async function Page() {
  const [userName, docStatus] = await Promise.all([
    getUserName(),
    getDocsStatus(),
  ]);
  return <DocsPageClient userName={userName ?? ''} docStatus={docStatus} />;
}
