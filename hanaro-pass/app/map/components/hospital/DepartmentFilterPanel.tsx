'use client';

import { DEPARTMENTS } from '../../constants/departments';

type Props = {
  value: string[];
  onChange: (value: string[]) => void;
};

export default function DepartmentFilterPanel({ value, onChange }: Props) {
  const toggle = (dep: string) => {
    onChange(
      value.includes(dep) ? value.filter((d) => d !== dep) : [...value, dep],
    );
  };

  return (
    <>
      {DEPARTMENTS.map((dep) => {
        const checked = value.includes(dep);

        return (
          <button
            key={dep}
            type="button"
            onClick={() => toggle(dep)}
            className="flex h-16 w-full items-center gap-3 border-gray-200 border-b px-4 last:border-b-0"
          >
            <div
              className={`flex h-5 w-5 items-center justify-center rounded ${checked ? 'bg-green-ez' : 'border border-gray-300'}
              `}
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

            <span className="font-medium text-base">{dep}</span>
          </button>
        );
      })}
    </>
  );
}
