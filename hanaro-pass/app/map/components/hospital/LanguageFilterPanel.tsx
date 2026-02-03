'use client';

import { LANGUAGE_MAP } from '../../constants/languages';

type Props = {
  value: string[];
  onChange: (v: string[]) => void;
  lang: 'ko' | 'en';
};

export default function LanguageFilterPanel({ value, onChange, lang }: Props) {
  const koOptions = LANGUAGE_MAP.ko;
  const displayOptions = LANGUAGE_MAP[lang];

  const toggle = (koLang: string) => {
    onChange(
      value.includes(koLang)
        ? value.filter((l) => l !== koLang)
        : [...value, koLang],
    );
  };

  return (
    <>
      {koOptions.map((koLang, idx) => {
        const checked = value.includes(koLang);
        const label = displayOptions[idx];

        return (
          <button
            key={koLang}
            type="button"
            onClick={() => toggle(koLang)}
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
