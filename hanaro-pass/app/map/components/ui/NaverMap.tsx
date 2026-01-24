'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  DEFAULT_COORDS,
  MARKER_ICONS,
  NAVER_MAP_SCRIPT_URL,
} from '../../constants/map';
import type { Embassy } from '../../mock/embassyExchange';
import type { HospitalPlace } from '../../mock/hospitalMap.mock';
import type { SavedPlace } from '../../mock/savedPlaces';

type Place = {
  id: string;
  name: string;
  address: string;
};

export type NaverSearchResult = {
  title: string;
  roadAddress: string;
  address?: string;
  telephone: string;
  mapx: string;
  mapy: string;
  category?: string;
  name?: string;
  type?: string;
};

type NaverMapProps = {
  onMarkerClick: (
    place: Place | HospitalPlace | SavedPlace | Embassy | NaverSearchResult,
  ) => void;
  onMapMoved?: (address: string) => void;
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

// 마커를 화면 상단에 위치시키기 위한 위도 오프셋
const LATITUDE_OFFSET = -0.004;

export const NaverMap = forwardRef<NaverMapHandle, NaverMapProps>(
  (props, ref) => {
    const {
      onMarkerClick,
      savedPlaces,
      embassyData,
      showBookmarks,
      showEmbassy,
      hospitals,
      activeCategory,
      onMapMoved,
      showExchanges,
      exchangeResults,
    } = props;

    const mapRef = useRef<naver.maps.Map | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const markersRef = useRef<naver.maps.Marker[]>([]);
    const onMarkerClickRef = useRef(onMarkerClick);
    const [isMapReady, setIsMapReady] = useState(false);
    const currentExchangeKeyRef = useRef<string>('');
    const prevResultsRef = useRef<string>(''); // [추가]

    // 최신 콜백 유지를 위한 Ref 업데이트
    useEffect(() => {
      onMarkerClickRef.current = onMarkerClick;
    }, [onMarkerClick]);

    // 오프셋을 적용하여 지도를 이동시키는 함수
    const panToWithOffset = useCallback((lat: number, lng: number) => {
      if (!mapRef.current) return;
      const { naver } = window;
      const centerWithOffset = new naver.maps.LatLng(
        lat + LATITUDE_OFFSET,
        lng,
      );
      mapRef.current.panTo(centerWithOffset);
    }, []);

    // 마커 생성 공통 헬퍼
    const createMarker = useCallback(
      (lat: number, lng: number, iconHtml: string, onClick: () => void) => {
        if (!mapRef.current) return null;
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(lat, lng),
          map: mapRef.current,
          icon: { content: iconHtml, anchor: new naver.maps.Point(10, 10) },
        });
        naver.maps.Event.addListener(marker, 'click', onClick);
        return marker;
      },
      [],
    );

    const updateCenterAddress = useCallback(() => {
      const map = mapRef.current;
      const { naver } = window;
      if (!map || !naver.maps.Service) return;

      const center = map.getCenter();

      naver.maps.Service.reverseGeocode(
        {
          coords: center,
          orders: [
            naver.maps.Service.OrderType.ADDR,
            naver.maps.Service.OrderType.ROAD_ADDR,
          ].join(','),
        },
        (status, response) => {
          if (status !== naver.maps.Service.Status.OK) return;
          const result = response.v2;
          if (result.address) {
            const region = result.results[0]?.region;
            const area2 = region?.area2?.name || '';
            const area3 = region?.area3?.name || '';
            const fullRegionName = `${area2} ${area3}`.trim();

            if (onMapMoved && fullRegionName) {
              onMapMoved(fullRegionName);
            }
          }
        },
      );
    }, [onMapMoved]);

    // 환전소 마커를 관리할 별도의 Ref
    const exchangeMarkersRef = useRef<naver.maps.Marker[]>([]);

    // 일반 마커 관리 (북마크, 대사관, 병원)
    useEffect(() => {
      const currentMap = mapRef.current;
      if (!isMapReady || !currentMap) return;

      // 일반 마커만 초기화
      markersRef.current.forEach((m) => {
        m.setMap(null);
      });
      markersRef.current = [];

      const newMarkers: naver.maps.Marker[] = [];

      // 북마크, 대사관, 병원 생성 로직
      if (showBookmarks && savedPlaces) {
        savedPlaces.forEach((p) => {
          const m = createMarker(
            Number(p.latitude),
            Number(p.longitude),
            MARKER_ICONS.bookmark,
            () => onMarkerClickRef.current(p),
          );
          if (m) newMarkers.push(m);
        });
      }
      // 대사관 마커
      if (showEmbassy && embassyData) {
        const m = createMarker(
          embassyData.latitude,
          embassyData.longitude,
          MARKER_ICONS.embassy,
          () => onMarkerClickRef.current(embassyData),
        );
        if (m) newMarkers.push(m);
      }

      // 병원 마커
      if (activeCategory === 'hospital' && hospitals) {
        hospitals.forEach((h) => {
          const m = createMarker(
            Number(h.latitude),
            Number(h.longitude),
            MARKER_ICONS.hospital,
            () => onMarkerClickRef.current(h),
          );
          if (m) newMarkers.push(m);
        });
      }
      markersRef.current = newMarkers;

      if (!showExchanges) {
        exchangeMarkersRef.current.forEach((m) => {
          m.setMap(null);
        });
        exchangeMarkersRef.current = [];
      }
    }, [
      isMapReady,
      showBookmarks,
      showEmbassy,
      activeCategory,
      savedPlaces,
      embassyData,
      hospitals,
      createMarker,
      showExchanges,
    ]);

    useEffect(() => {
      const currentMap = mapRef.current;
      if (!isMapReady || !currentMap) return;

      markersRef.current.forEach((m) => {
        m.setMap(null);
      });
      markersRef.current = [];
      const newMarkers: naver.maps.Marker[] = [];

      if (showBookmarks && savedPlaces) {
        savedPlaces.forEach((p) => {
          const m = createMarker(
            Number(p.latitude),
            Number(p.longitude),
            MARKER_ICONS.bookmark,
            () => onMarkerClickRef.current(p),
          );
          if (m) newMarkers.push(m);
        });
      }
      if (showEmbassy && embassyData) {
        const m = createMarker(
          embassyData.latitude,
          embassyData.longitude,
          MARKER_ICONS.embassy,
          () => onMarkerClickRef.current(embassyData),
        );
        if (m) newMarkers.push(m);
      }
      if (activeCategory === 'hospital' && hospitals) {
        hospitals.forEach((h) => {
          const m = createMarker(
            Number(h.latitude),
            Number(h.longitude),
            MARKER_ICONS.hospital,
            () => onMarkerClickRef.current(h),
          );
          if (m) newMarkers.push(m);
        });
      }
      markersRef.current = newMarkers;

      if (!showExchanges) {
        exchangeMarkersRef.current.forEach((m) => {
          m.setMap(null);
        });
        exchangeMarkersRef.current = [];
        currentExchangeKeyRef.current = '';
        prevResultsRef.current = '';
      }
    }, [
      isMapReady,
      showBookmarks,
      showEmbassy,
      activeCategory,
      savedPlaces,
      embassyData,
      hospitals,
      createMarker,
      showExchanges,
    ]);

    // 환전소 마커 관리
    useEffect(() => {
      if (
        !isMapReady ||
        !showExchanges ||
        !exchangeResults ||
        exchangeResults.length === 0
      )
        return;

      const resultsKey = JSON.stringify(exchangeResults);
      // 이미 그려진 데이터와 같으면 스킵
      if (
        currentExchangeKeyRef.current === resultsKey &&
        exchangeMarkersRef.current.length > 0
      )
        return;

      // 기존 마커 제거
      exchangeMarkersRef.current.forEach((m) => {
        m.setMap(null);
      });
      exchangeMarkersRef.current = [];
      currentExchangeKeyRef.current = resultsKey;

      // 모든 주소를 좌표로 변환하는 Promise 생성
      const geocodePromises = exchangeResults.map((result) => {
        const addr = result.roadAddress || result.address;
        if (!addr) return Promise.resolve(null);

        return new Promise<{
          lat: number;
          lng: number;
          data: NaverSearchResult;
        } | null>((resolve) => {
          window.naver.maps.Service.geocode(
            { query: addr },
            (status, response) => {
              if (
                status === window.naver.maps.Service.Status.OK &&
                response.v2.addresses.length > 0
              ) {
                const item = response.v2.addresses[0];
                resolve({
                  lat: Number(item.y),
                  lng: Number(item.x),
                  data: result,
                });
              } else {
                resolve(null); // 실패 시 null
              }
            },
          );
        });
      });

      // 모든 좌표 변환이 완료 -> 한 번에 마커 생성
      Promise.all(geocodePromises).then((results) => {
        if (!showExchanges || currentExchangeKeyRef.current !== resultsKey)
          return;

        const newMarkers: naver.maps.Marker[] = [];

        results.forEach((res) => {
          if (!res) return;

          const m = createMarker(
            res.lat,
            res.lng,
            MARKER_ICONS.exchange,
            () => {
              onMarkerClickRef.current({
                ...res.data,
                name: res.data.title.replace(/<[^>]*>?/g, ''),
                type: '환전소',
              });
            },
          );
          if (m) newMarkers.push(m);
        });

        exchangeMarkersRef.current = newMarkers;
      });
    }, [isMapReady, showExchanges, exchangeResults, createMarker]);

    useEffect(() => {
      const NAVER_MAP_KEY = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
      if (!NAVER_MAP_KEY || !containerRef.current) return;

      const initMap = () => {
        const container = containerRef.current;
        if (!container || mapRef.current) return;

        const { naver } = window;
        const renderMap = (lat: number, lng: number) => {
          const center = new naver.maps.LatLng(lat + LATITUDE_OFFSET, lng);

          const map = new naver.maps.Map(container, {
            center,
            zoom: 15,
            logoControl: false,
          });

          mapRef.current = map;
          setIsMapReady(true);

          // 내 위치 마커
          const myMarker = new naver.maps.Marker({
            position: new naver.maps.LatLng(lat, lng),
            map,
            icon: {
              content: MARKER_ICONS.myLocation,
              anchor: new naver.maps.Point(8, 8),
            },
          });

          naver.maps.Event.addListener(myMarker, 'click', () =>
            onMarkerClickRef.current({
              id: 'my-location',
              name: '내 위치',
              address: '현재 위치',
            }),
          );

          naver.maps.Event.addListener(map, 'idle', () =>
            updateCenterAddress(),
          );
          updateCenterAddress();
        };

        navigator.geolocation.getCurrentPosition(
          (pos) => renderMap(pos.coords.latitude, pos.coords.longitude),
          // fallback: 성수역
          () => renderMap(DEFAULT_COORDS.lat, DEFAULT_COORDS.lng),
          { enableHighAccuracy: true, timeout: 10000 },
        );
      };

      const scriptId = 'naver-map-script';
      const existingScript = document.getElementById(
        scriptId,
      ) as HTMLScriptElement;

      if (existingScript) {
        window.naver?.maps
          ? initMap()
          : existingScript.addEventListener('load', initMap);
      } else {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = `${NAVER_MAP_SCRIPT_URL}?ncpKeyId=${NAVER_MAP_KEY}&submodules=geocoder`;
        script.async = true;
        script.onload = initMap;
        document.head.appendChild(script);
      }
    }, [updateCenterAddress]);

    useImperativeHandle(ref, () => ({
      centerToMyPosition: () => {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            panToWithOffset(pos.coords.latitude, pos.coords.longitude);
          },
          () => {
            panToWithOffset(DEFAULT_COORDS.lat, DEFAULT_COORDS.lng);
          },
          { enableHighAccuracy: true, timeout: 10000 },
        );
      },
      panToLocation: (lat, lng) => panToWithOffset(lat, lng),
    }));

    return <div ref={containerRef} className="h-full w-full" />;
  },
);
