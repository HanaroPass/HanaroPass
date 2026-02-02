import { getUserIdFromSession } from '@/lib/session';
import { getMyEmbassy } from './actions/embassy';
import { getHospitals } from './actions/hospitals';
import { getSavedPlaces } from './actions/savedPlaces';
import type { Hospital } from './hooks/useHospitalFilters';
import MapPageClient from './mapPageClient';

export default async function Page() {
  const userId = await getUserIdFromSession();

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
  const formattedHospitals = hospitals.map((h) => ({
    ...h,
    nameEn: h.nameEn ?? undefined,
    phone: h.phone ?? undefined,
    imageUrl: h.imageUrl ?? undefined,
  })) as Hospital[];

  return (
    <MapPageClient
      hospitals={formattedHospitals}
      initialEmbassy={embassyData}
      initialSavedPlaces={savedPlacesData}
    />
  );
}
