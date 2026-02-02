'use client';

import {
  DEPARTMENT_TRANSLATIONS,
  DEPARTMENTS,
  type Department,
} from '../../constants/departments';

type Props = {
  value: string[];
  onChange: (value: string[]) => void;
  lang?: 'ko' | 'en';
};

export default function DepartmentFilterPanel({
  value,
  onChange,
  lang = 'ko',
}: Props) {
  const toggle = (depKey: string) => {
    onChange(
      value.includes(depKey)
        ? value.filter((d) => d !== depKey)
        : [...value, depKey],
    );
  };

  return (
    <>
      {DEPARTMENTS.map((depKey) => {
        const checked = value.includes(depKey);
        const displayLabel =
          DEPARTMENT_TRANSLATIONS[depKey as Department][lang];

        return (
          <button
            key={depKey}
            type="button"
            onClick={() => toggle(depKey)}
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

            <span className="font-medium text-base">{displayLabel}</span>
          </button>
        );
      })}
    </>
  );
}
