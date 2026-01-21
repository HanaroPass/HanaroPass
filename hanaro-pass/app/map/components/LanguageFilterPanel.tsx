"use client";

import { LANGUAGES } from "../constants/languages";

export default function LanguageFilterPanel({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (lang: string) => {
    onChange(
      value.includes(lang)
        ? value.filter((l) => l !== lang)
        : [...value, lang]
    );
  };

  return (
    <>
      {LANGUAGES.map((lang) => {
        const checked = value.includes(lang);

        return (
            <div
            key={lang}
            onClick={() => toggle(lang)}
            className="
                flex items-center gap-3 h-16 px-4 cursor-pointer
                border-b border-gray-200
                last:border-b-0
            "
            >
            <div
              className={`
                w-5 h-5 rounded flex items-center justify-center
                ${
                  checked
                    ? "bg-green-ez"
                    : "border border-gray-300"
                }
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

            <span className="text-base font-medium">{lang}</span>
          </div>
        );
      })}
    </>
  );
}
