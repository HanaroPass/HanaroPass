'use client';
import { Globe, Phone } from 'lucide-react';
import Image from 'next/image';

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
};

export function PlaceCard({ data }: PlaceCardProps) {
  const handleNavigation = () => {
    const { name } = data;

    const searchQuery = encodeURIComponent(`${name}`);
    const naverMapUrl = `https://map.naver.com/v5/search/${searchQuery}`;

    window.open(naverMapUrl, '_blank', 'noopener,noreferrer');
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
            {data.distance?.trim() && (
              <span className="text-black-900">{data.distance}</span>
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
          aria-label={`길찾기: ${data.name}`}
          className="flex items-center justify-center gap-2 rounded-full border border-black-200 bg-white px-2 py-1 text-black-800 text-sm"
        >
          <Globe className="h-4 w-4" />
          네이버 지도
        </button>
      </div>
    </div>
  );
}
