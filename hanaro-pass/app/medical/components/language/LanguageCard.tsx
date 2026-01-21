import { CircleCheck } from 'lucide-react';

export type Language = {
  id: string;
  name: string;
  sub: string;
  flag: string;
};

type LanguageCardProps = {
  lang: Language;
  isSelected: boolean;
  onToggle: (id: string) => void;
};

export default function LanguageCard({
  lang,
  isSelected,
  onToggle,
}: LanguageCardProps) {
  return (
    <button
      type="button"
      onClick={() => onToggle(lang.id)}
      aria-pressed={isSelected}
      className={`flex w-full cursor-pointer items-center justify-between rounded-lg border-2 p-4 transition-all focus:outline-none focus:ring-2 focus:ring-green-ez focus:ring-offset-2 ${
        isSelected
          ? 'border-green-ez bg-green-50'
          : 'border-gray-100 bg-gray-50 hover:border-gray-200 hover:bg-gray-100'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl" aria-hidden="true">
          {lang.flag}
        </span>
        <div className="text-left">
          {' '}
          <p className="font-sans font-semibold text-base text-primary">
            {lang.name}
          </p>
          <p className="font-sans text-muted-foreground text-sm">{lang.sub}</p>
        </div>
      </div>

      {isSelected && (
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-ez">
          <CircleCheck className="h-4 w-4 text-white" strokeWidth={3} />
        </div>
      )}
    </button>
  );
}
