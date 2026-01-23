'use client';

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import type { Embassy } from '../../mock/embassyExchange';
import type { HospitalPlace } from '../../mock/hospitalMap.mock';
import type { SavedPlace } from '../../mock/savedPlaces';

type Place = {
  id: number;
  name: string;
  address: string;
};

type NaverMapProps = {
  onMarkerClick: (
    place: Place | HospitalPlace | SavedPlace | Embassy | NaverSearchResult,
  ) => void;
  savedPlaces?: SavedPlace[];
  embassyData?: Embassy;
  exchangeResults?: NaverSearchResult[];
  showBookmarks?: boolean;
  hospitals?: HospitalPlace[];
  activeCategory?: 'hospital' | 'embassy' | 'exchange' | null;
  showEmbassy?: boolean;
  showExchanges?: boolean;
};

export type NaverMapHandle = {
  centerToMyPosition: () => void;
  panToLocation: (lat: number, lng: number) => void;
};

export type NaverSearchResult = {
  title: string;
  roadAddress: string;
  address: string;
  telephone: string;
  mapx: string;
  mapy: string;
  category?: string;
};

export const NaverMap = forwardRef<NaverMapHandle, NaverMapProps>(
  function NaverMap(
    {
      onMarkerClick,
      savedPlaces,
      embassyData,
      showBookmarks,
      showEmbassy,
      hospitals,
      activeCategory,
    },
    ref,
  ) {
    const mapRef = useRef<naver.maps.Map | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const markersRef = useRef<naver.maps.Marker[]>([]);
    const onMarkerClickRef = useRef(onMarkerClick);
    const isMountedRef = useRef(true);
    const [isMapReady, setIsMapReady] = useState(false);

    useEffect(() => {
      onMarkerClickRef.current = onMarkerClick;
    }, [onMarkerClick]);

    /** 최신 onMarkerClick 유지 */
    useEffect(() => {
      onMarkerClickRef.current = onMarkerClick;
    }, [onMarkerClick]);

    useEffect(() => {
      markersRef.current.forEach((marker) => {
        marker.setMap(null);
      });
      markersRef.current = [];

      const currentMap = mapRef.current;

      if (isMapReady && currentMap) {
        const { naver } = window;

        if (showBookmarks && savedPlaces) {
          savedPlaces.forEach((place) => {
            const marker = new naver.maps.Marker({
              position: new naver.maps.LatLng(
                Number(place.latitude),
                Number(place.longitude),
              ),
              map: currentMap,
              icon: {
                content: `
                <div class="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-[0_4px_8px_rgba(0,0,0,0.2)]">
                  <div class="w-4 h-4 bg-hana-green rounded-full flex items-center justify-center shadow-inner">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    style="filter: drop-shadow(0 1px 1px rgba(0,0,0,0.2));"
                  >
                    <path d="M5 5C5 3.34315 6.34315 2 8 2H16C17.6569 2 19 3.34315 19 5V22L12 19L5 22V5Z" />
                  </svg>
                </div>
              </div>
            `,
                anchor: new naver.maps.Point(10, 10),
              },
            });
            naver.maps.Event.addListener(marker, 'click', () => {
              onMarkerClick(place);
            });
            markersRef.current.push(marker);
          });
        }

        // 대사관 마커
        if (showEmbassy && embassyData) {
          const marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(
              embassyData.latitude,
              embassyData.longitude,
            ),
            map: currentMap,
            icon: {
              content: `
                <div class="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-[0_4px_8px_rgba(0,0,0,0.2)]">
                  <div class="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center shadow-inner">
                    <svg 
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      style="filter: drop-shadow(0 0.5px 0.5px rgba(0,0,0,0.1));"
                    >
                      <line x1="3" y1="22" x2="21" y2="22"></line>
                      <line x1="6" y1="18" x2="6" y2="11"></line>
                      <line x1="10" y1="18" x2="10" y2="11"></line>
                      <line x1="14" y1="18" x2="14" y2="11"></line>
                      <line x1="18" y1="18" x2="18" y2="11"></line>
                      <polygon points="12 2 20 7 4 7 12 2"></polygon>
                    </svg>  
                  </div>
                </div>
              `,
              anchor: new naver.maps.Point(10, 10),
            },
          });

          naver.maps.Event.addListener(marker, 'click', () => {
            onMarkerClick(embassyData);
          });
          markersRef.current.push(marker);
        }
        /** 병원 마커 */
        if (activeCategory === 'hospital' && hospitals) {
          hospitals.forEach((hospital) => {
            const marker = new naver.maps.Marker({
              position: new naver.maps.LatLng(
                Number(hospital.latitude),
                Number(hospital.longitude),
              ),
              currentMap,
              icon: {
                content: `
            <div class="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-[0_2px_5px_rgba(0,0,0,0.2)]">
              <div class="w-4 h-4 bg-[#F9FAFB] rounded-full flex items-center justify-center shadow-inner">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4.5v15M4.5 12h15" stroke="#F43F5E" stroke-width="6.5" stroke-linecap="round" stroke-line join="round"/>
                </svg>
              </div>
            </div>
            `,
                anchor: new naver.maps.Point(14, 14),
              },
            });

            naver.maps.Event.addListener(marker, 'click', () => {
              onMarkerClickRef.current(hospital);
            });

            markersRef.current.push(marker);
          });
        }
      }
    }, [
      isMapReady,
      showBookmarks,
      showEmbassy,
      savedPlaces,
      embassyData,
      onMarkerClick,
      activeCategory,
      hospitals,
    ]);

    useEffect(() => {
      const NAVER_MAP_KEY = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
      const NAVER_MAP_SCRIPT_URL =
        'https://oapi.map.naver.com/openapi/v3/maps.js';

      if (!NAVER_MAP_KEY || !containerRef.current) return;

      const initMap = () => {
        if (!isMountedRef.current || mapRef.current) return;

        const { naver } = window;
        if (!naver?.maps) return;

        const renderMap = (lat: number, lng: number) => {
          if (!isMountedRef.current || !containerRef.current) return;

          const center = new naver.maps.LatLng(lat, lng);

          const map = new naver.maps.Map(containerRef.current, {
            center,
            zoom: 15,
            logoControl: false,
          });

          mapRef.current = map;
          setIsMapReady(true);

          const myMarker = new naver.maps.Marker({
            position: center,
            map,
            icon: {
              content: `<div class="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg"/>`,
              anchor: new naver.maps.Point(8, 8),
            },
          });

          naver.maps.Event.addListener(myMarker, 'click', () => {
            onMarkerClickRef.current({
              id: 1,
              name: '내 위치',
              address: '현재 위치',
            });
          });
        };

        navigator.geolocation.getCurrentPosition(
          (pos) => renderMap(pos.coords.latitude, pos.coords.longitude),
          // fallback: 성수역
          () => renderMap(37.5445, 127.0557),
          {
            enableHighAccuracy: true,
            timeout: 10000,
          },
        );
      };

      const existingScript = document.getElementById(
        'naver-map-script',
      ) as HTMLScriptElement | null;

      if (existingScript) {
        window.naver?.maps
          ? initMap()
          : existingScript.addEventListener('load', initMap, { once: true });
      } else {
        const script = document.createElement('script');
        script.id = 'naver-map-script';
        script.src = `${NAVER_MAP_SCRIPT_URL}?ncpKeyId=${NAVER_MAP_KEY}`;
        script.async = true;
        script.onload = initMap;

        document.head.appendChild(script);
      }

      return () => {
        isMountedRef.current = false;
      };
    }, []);

    useImperativeHandle(ref, () => ({
      centerToMyPosition: () => {
        if (!mapRef.current) return;

        navigator.geolocation.getCurrentPosition((pos) => {
          const { latitude, longitude } = pos.coords;
          const newCenter = new naver.maps.LatLng(latitude, longitude);
          mapRef.current?.panTo(newCenter);
        });
      },
      panToLocation: (lat: number, lng: number) => {
        if (!mapRef.current) return;
        mapRef.current.panTo(new naver.maps.LatLng(lat, lng));
      },
    }));

    return <div ref={containerRef} className="h-full w-full" />;
  },
);
