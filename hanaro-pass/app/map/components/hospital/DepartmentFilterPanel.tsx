'use client';

import { DEPARTMENT_MAP } from '../../constants/departments';

type Props = {
  value: string[];
  onChange: (v: string[]) => void;
  lang: 'ko' | 'en';
};

export default function DepartmentFilterPanel({
  value,
  onChange,
  lang,
}: Props) {
  const koOptions = DEPARTMENT_MAP.ko;
  const displayOptions = DEPARTMENT_MAP[lang];

  const toggle = (koDep: string) => {
    onChange(
      value.includes(koDep)
        ? value.filter((d) => d !== koDep)
        : [...value, koDep],
    );
  };

  return (
    <>
      {koOptions.map((koDep, idx) => {
        const checked = value.includes(koDep);
        const label = displayOptions[idx];

        return (
          <button
            key={koDep}
            type="button"
            onClick={() => toggle(koDep)}
            className="flex h-16 w-full items-center gap-3 border-gray-200 border-b px-4 last:border-b-0"
          >
            <div
              className={`flex h-5 w-5 items-center justify-center rounded ${
                checked ? 'bg-green-ez' : 'border border-gray-300'
              }`}
            >
              {checked && (
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 4L4.5 7L11 1"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>

            <span className="font-medium text-base">{label}</span>
          </button>
        );
      })}
    </>
  );
}
