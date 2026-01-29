'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  DEFAULT_COORDS,
  MARKER_ICONS,
  NAVER_MAP_SCRIPT_URL,
} from '../constants/map';

export function useNaverMapInit(
  containerRef: React.RefObject<HTMLDivElement | null>,
  onMapMoved?: (
    address: string,
    bounds?: {
      south: number;
      west: number;
      north: number;
      east: number;
    },
  ) => void,
) {
  const mapRef = useRef<naver.maps.Map | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

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

    window.naver.maps.Service.reverseGeocode(
      {
        coords: topCenterCoord,
        orders: [
          window.naver.maps.Service.OrderType.ADDR,
          window.naver.maps.Service.OrderType.ROAD_ADDR,
        ].join(','),
      },
      (status, response) => {
        if (status !== window.naver.maps.Service.Status.OK) return;
        const result = response.v2;
        const region = result.results[0]?.region;
        const fullRegionName =
          `${region?.area2?.name || ''} ${region?.area3?.name || ''}`.trim();
        if (onMapMoved && fullRegionName) {
          onMapMoved(fullRegionName, mapBounds);
        }
      },
    );
  }, [onMapMoved]);

  useEffect(() => {
    const NAVER_MAP_KEY = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
    const container = containerRef.current;
    if (!NAVER_MAP_KEY || !container) return;

    let idleListener: naver.maps.MapEventListener | null = null;
    let isMounted = true;

    const initMap = () => {
      if (!container || mapRef.current || !isMounted) return;

      const renderMap = (lat: number, lng: number) => {
        if (!isMounted) return;

        const map = new window.naver.maps.Map(container, {
          center: new window.naver.maps.LatLng(lat, lng),
          zoom: 15,
          logoControl: false,
        });

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

        // 이벤트 리스너를 변수에 저장
        idleListener = window.naver.maps.Event.addListener(
          map,
          'idle',
          updateCenterAddress,
        );
        updateCenterAddress();
      };

      navigator.geolocation.getCurrentPosition(
        (pos) => renderMap(pos.coords.latitude, pos.coords.longitude),
        () => {
          renderMap(DEFAULT_COORDS.lat, DEFAULT_COORDS.lng);

          onMapMoved?.('서울특별시 성동구 성수동');
        },
        { enableHighAccuracy: true, timeout: 10000 },
      );
    };

    const scriptId = 'naver-map-script';
    const existingScript = document.getElementById(
      scriptId,
    ) as HTMLScriptElement | null;

    if (!existingScript) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `${NAVER_MAP_SCRIPT_URL}?ncpKeyId=${NAVER_MAP_KEY}&submodules=geocoder`;
      script.async = true;
      script.onload = () => initMap();
      document.head.appendChild(script);
    } else {
      if (window.naver?.maps) initMap();
      else existingScript.addEventListener('load', initMap);
    }

    return () => {
      isMounted = false;
      if (idleListener) window.naver.maps.Event.removeListener(idleListener);
      if (existingScript) existingScript.removeEventListener('load', initMap);
    };
  }, [updateCenterAddress, containerRef, onMapMoved]);

  return { mapRef, isMapReady };
}
