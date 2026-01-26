import { Loader } from 'lucide-react';
import { Suspense, use } from 'react';
import { getUserCardsAction } from './actions/getUserCards.action';
import CouponListLoader from './components/CouponList.loader';

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

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab: rawTab } = await searchParams;
  const tab =
    rawTab && rawTab in TAB_COMPONENTS
      ? (rawTab as keyof typeof TAB_COMPONENTS)
      : 'pay';

  const TabComponent = TAB_COMPONENTS[tab];
  const cardsPromise = tab === 'pay' ? getUserCardsAction() : null;

  const couponList =
    tab === 'pay' ? (
      <Suspense
        fallback={
          <Loader className="mx-auto h-8 w-8 animate-spin text-green-ez" />
        }
      >
        <CouponListLoader />
      </Suspense>
    ) : null;

  return (
    <MainWrapper activeTab={tab}>
      <div className="app-layout">
        <MainWrapper.Title>
          {tab === 'pay' && 'EZ Pay'}
          {tab === 'transfer' && '조회/이체'}
          {tab === 'service' && '서비스'}
        </MainWrapper.Title>

        <div className="app-main">
          {tab === 'pay' ? (
            <Suspense
              fallback={
                <div className="flex justify-center py-10">
                  <Loader className="animate-spin text-green-ez" />
                </div>
              }
            >
              <TabComponent
                cardsPromise={cardsPromise}
                couponList={couponList}
              />
            </Suspense>
          ) : (
            <TabComponent />
          )}
        </div>
      </div>
    </MainWrapper>
  );
}
