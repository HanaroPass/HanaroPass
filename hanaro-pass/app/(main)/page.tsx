import { use } from 'react';
import MainWrapper from './components/MainWrapper';

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const tab = use(searchParams)?.tab ?? 'pay';

  return <MainWrapper activeTab={tab}></MainWrapper>;
}
