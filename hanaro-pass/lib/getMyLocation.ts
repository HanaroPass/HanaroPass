import { useEffect, useState } from 'react';

type Location = {
  lat: number;
  lng: number;
};

export function useMyLocation(options?: PositionOptions) {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<GeolocationPositionError | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError({
        code: 0,
        message: 'Geolocation not supported',
      } as GeolocationPositionError);
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      },
      options,
    );
  }, [options]);

  return { location, loading, error };
}
