'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  DEFAULT_COORDS,
  MARKER_ICONS,
  NAVER_MAP_SCRIPT_URL,
} from '../constants/map';
import type { MapBounds } from '../types/map';

export function useNaverMapInit(
  containerRef: React.RefObject<HTMLDivElement | null>,
  onMapMoved?: (address: string, bounds?: MapBounds) => void,
  lang: 'ko' | 'en' = 'ko',
) {
  const mapRef = useRef<naver.maps.Map | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(false);

  const updateCenterAddress = useCallback(() => {
    const map = mapRef.current;
    if (!map || !window.naver?.maps?.Service) return;

    const bounds = map.getBounds() as naver.maps.LatLngBounds;
    const sw = bounds.getSW();
    const ne = bounds.getNE();

    const mapBounds = {
      south: sw.lat(),
      west: sw.lng(),
      north: ne.lat(),
      east: ne.lng(),
    };

    const proj = map.getProjection();
    const centerPoint = proj.fromCoordToOffset(map.getCenter());
    const topCenterPoint = new window.naver.maps.Point(
      centerPoint.x,
      centerPoint.y - 150,
    );
    const topCenterCoord = proj.fromOffsetToCoord(topCenterPoint);

    const geocodeOptions = {
      coords: topCenterCoord,
      orders: [
        window.naver.maps.Service.OrderType.ADDR,
        window.naver.maps.Service.OrderType.ROAD_ADDR,
      ].join(','),
      language: lang,
    };

    window.naver.maps.Service.reverseGeocode(
      geocodeOptions as unknown as naver.maps.Service.ReverseServiceOptions,
      (status, response) => {
        if (status !== window.naver.maps.Service.Status.OK) return;
        const result = response.v2;
        const region = result.results[0]?.region;
        const fullRegionName =
          lang === 'en'
            ? `${region?.area3?.name || ''}, ${region?.area2?.name || ''}`.trim()
            : `${region?.area2?.name || ''} ${region?.area3?.name || ''}`.trim();

        if (onMapMoved && fullRegionName) {
          onMapMoved(fullRegionName, mapBounds);
        }
      },
    );
  }, [onMapMoved, lang]);

  useEffect(() => {
    const NAVER_MAP_KEY = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
    const container = containerRef.current;
    if (!NAVER_MAP_KEY || !container) return;

    let isMounted = true;
    let idleListener: naver.maps.MapEventListener | null = null;

    const initMap = () => {
      if (!container || !isMounted) return;

      setIsMapLoading(true);
      container.style.transition = 'opacity 0.2s ease-in-out';
      container.style.opacity = '0';

      setTimeout(() => {
        if (!isMounted) return;
        container.innerHTML = '';
        mapRef.current = null;
        setIsMapReady(false);

        const renderMap = (lat: number, lng: number) => {
          if (!isMounted) return;

          const initialOptions = {
            center: new window.naver.maps.LatLng(lat, lng),
            zoom: 15,
            logoControl: false,
            language: lang,
          };

          const map = new window.naver.maps.Map(container, initialOptions);
          mapRef.current = map;
          setIsMapReady(true);
          map.panBy(new window.naver.maps.Point(0, 150));

          new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(lat, lng),
            map,
            icon: {
              content: MARKER_ICONS.myLocation,
              anchor: new window.naver.maps.Point(8, 8),
            },
          });

          idleListener = window.naver.maps.Event.addListener(
            map,
            'idle',
            updateCenterAddress,
          );
          updateCenterAddress();

          container.style.opacity = '1';
          setIsMapLoading(false);
        };

        navigator.geolocation.getCurrentPosition(
          (pos) => renderMap(pos.coords.latitude, pos.coords.longitude),
          () => {
            renderMap(DEFAULT_COORDS.lat, DEFAULT_COORDS.lng);
            onMapMoved?.(
              lang === 'en'
                ? 'Seongsu-dong, Seongdong-gu'
                : '서울특별시 성동구 성수동',
            );
            setIsMapLoading(false);
          },
          { enableHighAccuracy: true, timeout: 10000 },
        );
      }, 200);
    };

    const scriptId = 'naver-map-script';
    const oldScript = document.getElementById(scriptId);

    if (oldScript) {
      oldScript.remove();
      if ('naver' in window) {
        const win = window as unknown as Record<string, unknown>;
        win.naver = undefined;
      }
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `${NAVER_MAP_SCRIPT_URL}?ncpKeyId=${NAVER_MAP_KEY}&submodules=geocoder&language=${lang}`;
    script.async = true;
    script.onload = () => initMap();
    document.head.appendChild(script);

    return () => {
      isMounted = false;
      if (idleListener) window.naver.maps.Event.removeListener(idleListener);
    };
  }, [containerRef, lang, onMapMoved, updateCenterAddress]);

  return { mapRef, isMapReady, isMapLoading };
}
