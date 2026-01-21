"use client";

import { DEPARTMENTS } from "../constants/departments";

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function DepartmentFilterPanel({ value, onChange }: Props) {
  const toggle = (dep: string) => {
    onChange(
      value.includes(dep)
        ? value.filter((d) => d !== dep)
        : [...value, dep]
    );
  };

  return (
    <>
      {DEPARTMENTS.map((dep) => {
        const checked = value.includes(dep);

        return (
          <div
            key={dep}
            onClick={() => toggle(dep)}
            className="
              flex items-center gap-3 h-16 px-4 cursor-pointer
              border-b border-gray-200 last:border-b-0
            "
          >
            {/* 체크박스 */}
            <div
              className={`
                w-5 h-5 rounded flex items-center justify-center
                ${checked ? "bg-green-ez" : "border border-gray-300"}
              `}
            >
              {checked && (
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
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

            <span className="text-base font-medium">{dep}</span>
          </div>
        );
      })}
    </>
  );
}
