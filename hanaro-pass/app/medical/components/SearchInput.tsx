'use client';

import { Search } from 'lucide-react';

/**
 * QQQ: 나중에 채혀니가 만들면 바꿀 예정
 */

type SearchInputProps = {
  label?: string;
  hint?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchInput({
  label = '우리 병원 찾기',
  hint = '(지도에 등록된 병원만 검색됩니다)',
  placeholder = '병원명 또는 주소 검색',
  value,
  onChange,
}: SearchInputProps) {
  return (
    <section className="flex flex-col gap-3 px-6 pt-6">
      {/** biome-ignore lint/a11y/noLabelWithoutControl: 접근성 라벨이 아닌 UI 섹션 타이틀 용도로 사용됨 */}
      <label className="font-sans font-semibold text-black-900 text-sm">
        {label}
      </label>

      {/* 입력 영역 */}
      <div className="relative w-full">
        <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
          <Search size={20} className="text-gray-400" />
        </div>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-2xl border-2 border-gray-200 bg-white py-3 pr-4 pl-11 font-sans text-sm outline-none transition-colors focus:border-primary focus:ring-0"
        />
      </div>

      {/* 안내 문구 */}
      {hint && (
        <p className="font-sans text-gray-500 text-xs tracking-tight">{hint}</p>
      )}
    </section>
  );
}
