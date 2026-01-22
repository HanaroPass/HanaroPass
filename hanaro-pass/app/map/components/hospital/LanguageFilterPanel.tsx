'use client';

import { LANGUAGES } from '../../constants/languages';

export default function LanguageFilterPanel({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (lang: string) => {
    onChange(
      value.includes(lang) ? value.filter((l) => l !== lang) : [...value, lang],
    );
  };

  return (
    <>
      {LANGUAGES.map((lang) => {
        const checked = value.includes(lang);

        return (
          <button
            key={lang}
            type="button"
            onClick={() => toggle(lang)}
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

            <span className="font-medium text-base">{lang}</span>
          </button>
        );
      })}
    </>
  );
}
