'use client';

import {
  LANGUAGE_TRANSLATIONS,
  LANGUAGES,
  type Language,
} from '../../constants/languages';

type LanguageFilterPanelProps = {
  value: string[];
  onChange: (v: string[]) => void;
  lang?: 'ko' | 'en';
};

export default function LanguageFilterPanel({
  value,
  onChange,
  lang = 'ko',
}: LanguageFilterPanelProps) {
  const toggle = (langKey: string) => {
    onChange(
      value.includes(langKey)
        ? value.filter((l) => l !== langKey)
        : [...value, langKey],
    );
  };

  return (
    <>
      {LANGUAGES.map((langKey) => {
        const checked = value.includes(langKey);
        const displayLabel = LANGUAGE_TRANSLATIONS[langKey as Language][lang];

        return (
          <button
            key={langKey}
            type="button"
            onClick={() => toggle(langKey)}
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
