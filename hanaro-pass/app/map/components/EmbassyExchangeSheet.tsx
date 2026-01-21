'use client';
import { LocateFixed, Phone } from 'lucide-react';

export type LocationInfo = {
  name: string;
  type: string;
  status?: string;
  explainTime?: string;
  distance: string;
  address: string;
  phone: string;
  imageUrl?: string;
};

type EmbassyExchangeSheetProps = {
  data: LocationInfo;
};

export function EmbassyExchangeSheet({ data }: EmbassyExchangeSheetProps) {
  return (
    <div className="w-full bg-white font-semibold text-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-1 flex-col">
          <div>
            <h2 className="text-black-900 text-lg">{data.name}</h2>
            <span className="text-black-600">{data.type}</span>
          </div>

          {data.status && data.explainTime && (
            <div className="mt-2 flex flex-row gap-2">
              <span className="text-black-900">{data.status}</span>
              <span className="text-black-600">{data.explainTime}</span>
            </div>
          )}

          <div className="mt-1 flex flex-row gap-2">
            <span className="text-black-900">{data.distance}</span>
            <span className="text-black-800">{data.address}</span>
          </div>
        </div>

        <div className="shrink-0">
          <img
            src={
              data.imageUrl ??
              'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'
            }
            alt={`${data.name} 사진`}
            className="h-20 w-20 rounded object-cover"
          />
        </div>
      </div>

      <div className="mt-2 flex gap-2">
        <button
          type="button"
          aria-label={`전화 걸기: ${data.name}`}
          className="flex items-center justify-center gap-2 rounded-full border border-black-200 bg-white px-2 py-1 text-black-800 text-sm"
        >
          <Phone className="h-4 w-4" />
          전화
        </button>
        <button
          type="button"
          aria-label={`길찾기: ${data.name}`}
          className="flex items-center justify-center gap-2 rounded-full border border-black-200 bg-white px-2 py-1 text-black-800 text-sm"
        >
          <LocateFixed className="h-4 w-4" />
          길찾기
        </button>
      </div>
    </div>
  );
}
