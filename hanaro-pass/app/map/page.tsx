import { getUserIdFromSession } from '@/lib/session';
import { getMyEmbassy } from './actions/embassy';
import { getHospitals } from './actions/hospitals';
import { getSavedPlaces } from './actions/savedPlaces';
import { pickRandomReviews } from './constants/hospitalsReview';
import MapPageClient from './mapPageClient';
import { getHospitalAiSummary } from './services/hospitalAiSummary';

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

  const hospitalsWithSummary = await Promise.all(
    hospitals.map(async (h) => ({
      ...h,
      aiSummary: await getHospitalAiSummary({
        reviews: pickRandomReviews(),
      }),
    })),
  );

  const embassyData = embassyRes.success ? embassyRes.data : null;
  const savedPlacesData = savedPlacesRes.success ? savedPlacesRes.data : [];
  return (
    <MapPageClient
      hospitals={hospitalsWithSummary}
      initialEmbassy={embassyData}
      initialSavedPlaces={savedPlacesData}
    />
  );
}
