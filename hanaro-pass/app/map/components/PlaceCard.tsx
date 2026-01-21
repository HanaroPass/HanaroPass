"use client";
import { Phone, LocateFixed } from "lucide-react";

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

type PlaceCardProps = {
  data: LocationInfo;
};

export function PlaceCard({ data }: PlaceCardProps) {
  return (
    <div className="bg-white w-full text-sm font-semibold">
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col flex-1">
          <div>
            <h2 className="text-lg text-black-900">{data.name}</h2>
            <span className="text-black-600">{data.type}</span>
          </div>

          {data.status && data.explainTime && (
            <div className="flex flex-row gap-2 mt-2">
              <span className="text-black-900">{data.status}</span>
              <span className="text-black-600">{data.explainTime}</span>
            </div>
          )}

          <div className="flex flex-row gap-2 mt-1">
            <span className="text-black-900">{data.distance}</span>
            <span className="text-black-800">{data.address}</span>
          </div>
        </div>

        <div className="shrink-0">
          <img
            src={
              data.imageUrl ??
              "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
            }
            alt={`${data.name} 사진`}
            className="w-20 h-20 rounded object-cover"
          />
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <button
          type="button"
          aria-label={`전화 걸기: ${data.name}`}
          className="flex items-center justify-center gap-2 py-1 px-2 bg-white border border-black-200 text-sm text-black-800 rounded-full"
        >
          <Phone className="w-4 h-4" />
          전화
        </button>
        <button
          type="button"
          aria-label={`길찾기: ${data.name}`}
          className="flex items-center justify-center gap-2 py-1 px-2 bg-white border border-black-200 text-sm text-black-800 rounded-full"
        >
          <LocateFixed className="w-4 h-4" />
          길찾기
        </button>
      </div>
    </div>
  );
}
