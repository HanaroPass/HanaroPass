'use client';
import { Globe, Phone } from 'lucide-react';
import Image from 'next/image';
import { useMemo } from 'react';
import getDistance from '@/lib/getDistance';

export type LocationInfo = {
  id?: string | number;
  name: string;
  type: string;
  status?: string;
  explainTime?: string;
  distance?: string;
  address: string;
  phone: string;
  imageUrl?: string;
  latitude?: string | number;
  longitude?: string | number;
};

type PlaceCardProps = {
  data: LocationInfo;
  userCoords?: { lat: number; lng: number };
};

export function PlaceCard({ data, userCoords }: PlaceCardProps) {
  const calculatedDistance = useMemo(() => {
    if (!userCoords || !data.latitude || !data.longitude) return data.distance;

    const lat = Number(data.latitude);
    const lng = Number(data.longitude);
    const isWGS84 = lat > 30 && lat < 45 && lng > 120 && lng < 150;

    if (!isWGS84) return data.distance;

    const dist = getDistance(userCoords.lat, userCoords.lng, lat, lng);
    if (typeof dist !== 'number' || Number.isNaN(dist)) return data.distance;

    return dist < 1 ? `${Math.round(dist * 1000)}m` : `${dist.toFixed(1)}km`;
  }, [userCoords, data.latitude, data.longitude, data.distance]);

  const handleNavigation = () => {
    const { name, latitude, longitude } = data;
    const encodedName = encodeURIComponent(name);
    const appName = 'com.hanaropass.app';

    const lat = parseFloat(String(latitude));
    const lng = parseFloat(String(longitude));

    // 한국 범위
    const isKorea = lat > 32 && lat < 44 && lng > 123 && lng < 133;

    const webUrl = `https://map.naver.com/v5/search/${encodedName}`;

    if (!isKorea) {
      window.open(webUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    const appUrl = `nmap://route?dlat=${lat}&dlng=${lng}&dname=${encodedName}&appname=${appName}`;
    const androidIntent = `intent://route?dlat=${lat}&dlng=${lng}&dname=${encodedName}&appname=${appName}#Intent;scheme=nmap;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.nhn.android.nmap;end`;

    const userAgent = navigator.userAgent.toLowerCase();

    if (/android/.test(userAgent)) {
      window.location.href = androidIntent;
    } else if (/iphone|ipad|ipod/.test(userAgent)) {
      const clickedAt = Date.now();
      window.location.href = appUrl;
      setTimeout(() => {
        if (Date.now() - clickedAt < 2000) {
          window.open(webUrl, '_blank', 'noopener,noreferrer');
        }
      }, 1500);
    } else {
      window.open(webUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handlePhoneCall = () => {
    if (!data.phone) {
      alert('등록된 전화번호가 없습니다.');
      return;
    }

    window.location.href = `tel:${data.phone}`;
  };

  return (
    <div className="w-full bg-white p-4 font-semibold text-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-1 flex-col">
          <div>
            <h2 className="text-black-900 text-lg">{data.name}</h2>
            <span className="text-black-600">{data.type}</span>
          </div>

          <div className="mt-2 flex flex-row gap-2">
            {data.status && (
              <span className="text-black-900">{data.status}</span>
            )}
            {data.explainTime && (
              <span className="whitespace-pre-line text-black-600">
                {data.explainTime}
              </span>
            )}
          </div>

          <div className="mt-1 flex flex-row gap-2">
            {calculatedDistance && (
              <span className="text-black-900">{calculatedDistance}</span>
            )}
            <span className="text-black-800">{data.address}</span>
          </div>
        </div>

        <div className="shrink-0">
          {data.imageUrl && (
            <div className="shrink-0">
              <Image
                src={data.imageUrl}
                width={80}
                height={80}
                alt={`${data.name} 사진`}
                className="h-20 w-20 rounded object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-2 flex gap-2">
        <button
          type="button"
          onClick={handlePhoneCall}
          aria-label={`전화 걸기: ${data.name}`}
          className="flex items-center justify-center gap-2 rounded-full border border-black-200 bg-white px-2 py-1 text-black-800 text-sm"
        >
          <Phone className="h-4 w-4" />
          전화
        </button>
        <button
          type="button"
          onClick={handleNavigation}
          aria-label={`네이버 지도 연결: ${data.name}`}
          className="flex items-center justify-center gap-2 rounded-full border border-black-200 bg-white px-2 py-1 text-black-800 text-sm"
        >
          <Globe className="h-4 w-4" />
          네이버 지도
        </button>
      </div>
    </div>
  );
}
