'use server';
import { getCurrentUserName } from './actions/getUserName';
import DocsPageClient from './docsPageClient';

export default async function Page() {
  const userName = (await getCurrentUserName()) ?? '';
  return <DocsPageClient userName={userName} />;
}
