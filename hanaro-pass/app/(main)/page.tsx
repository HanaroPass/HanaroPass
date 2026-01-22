import { use } from 'react';
import MainWrapper from './components/MainWrapper';
import Pay from './components/Pay';
import Service from './components/Service';
import Transfer from './components/Transfer';

const TAB_COMPONENTS = {
  pay: Pay,
  remittance: Pay,
  transfer: Transfer,
  service: Service,
} as const;

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const rawTab = use(searchParams)?.tab;
  const tab =
    rawTab && rawTab in TAB_COMPONENTS
      ? (rawTab as keyof typeof TAB_COMPONENTS)
      : 'pay';
  const TabComponent = TAB_COMPONENTS[tab];

  return (
    <MainWrapper activeTab={tab}>
      <div className="app-layout">
        <MainWrapper.Title>
          {tab === 'pay' && 'EZ Pay'}
          {tab === 'transfer' && '조회/이체'}
          {tab === 'service' && '서비스'}
        </MainWrapper.Title>
        <div className="app-main">
          <TabComponent />
        </div>
      </div>
    </MainWrapper>
  );
}
