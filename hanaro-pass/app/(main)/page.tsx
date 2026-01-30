import { Loader } from 'lucide-react';
import { Suspense } from 'react';
import LoadingGate from '@/components/loading/LoadingGate';
import { checkIsAdmin } from '@/lib/user';
import { getIdentityData } from '../identity/actions/identity';
import type { IdentityData } from '../identity/actions/identity.schema';
import { getUserCardsAction } from './actions/getUserCards.action';
import CouponListLoader from './components/CouponList.loader';
import MainWrapper from './components/MainWrapper';
import PassportUnregisteredContent from './components/PassportUnregisteredContent';
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
  const isAdmin = await checkIsAdmin();
  const tab =
    rawTab && rawTab in TAB_COMPONENTS
      ? (rawTab as keyof typeof TAB_COMPONENTS)
      : 'pay';

  let identity: IdentityData | null = null;
  try {
    identity = await getIdentityData();
  } catch {
    identity = null;
  }

  const { passport, arc } = identity ?? {};
  const isRegistered = Boolean(passport || arc);
  if (!isRegistered) {
    return (
      <LoadingGate>
        <MainWrapper activeTab={tab} isRegistered={false} isAdmin={isAdmin}>
          <MainWrapper.Title>환율 정보</MainWrapper.Title>
          <PassportUnregisteredContent />
        </MainWrapper>
      </LoadingGate>
    );
  }

  const TabComponent = TAB_COMPONENTS[tab];
  const cardsPromise = tab === 'pay' ? getUserCardsAction() : undefined;

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
    <LoadingGate>
      <MainWrapper activeTab={tab} isRegistered isAdmin={isAdmin}>
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
    </LoadingGate>
  );
}
