import { getUserIdFromSession } from '@/lib/session';
import { getMyEmbassy } from './actions/embassy';
import { getHospitals } from './actions/hospitals';
import { getSavedPlaces } from './actions/savedPlaces';
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
  return (
    <MapPageClient
      hospitals={hospitals}
      initialEmbassy={embassyData}
      initialSavedPlaces={savedPlacesData}
    />
  );
}
