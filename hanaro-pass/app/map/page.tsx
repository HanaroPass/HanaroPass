import { getUserIdFromSession } from '@/lib/session';
import { getMyEmbassy } from './actions/embassy';
import { getHospitals } from './actions/hospitals';
import { getSavedPlaces } from './actions/savedPlaces';
import type { Hospital } from './hooks/useHospitalFilters';
import MapPageClient from './mapPageClient';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ lang?: 'ko' | 'en' }>;
}) {
  const userId = await getUserIdFromSession();
  const { lang: rawLang } = await searchParams;
  const lang = rawLang === 'en' ? 'en' : 'ko';

  const [hospitals, embassyRes, savedPlacesRes] = await Promise.all([
    getHospitals(),
    userId
      ? getMyEmbassy(userId)
      : Promise.resolve({ success: true, data: null }),
    userId
      ? getSavedPlaces(userId)
      : Promise.resolve({ success: true, data: [] }),
  ]);

  const embassyData = embassyRes.success ? embassyRes.data : null;
  const savedPlacesData = savedPlacesRes.success ? savedPlacesRes.data : [];
  const formattedHospitals: Hospital[] = hospitals.map((h) => ({
    ...h,
    nameEn: h.nameEn ?? undefined,
    phone: h.phone ?? null,
    imageUrl: h.imageUrl ?? undefined,

    aiSummaryEn: h.aiSummaryEn ?? undefined,
    aiSummary: h.aiSummary ?? undefined,
  }));

  return (
    <MapPageClient
      hospitals={formattedHospitals}
      initialEmbassy={embassyData}
      initialSavedPlaces={savedPlacesData}
      lang={lang}
    />
  );
}
