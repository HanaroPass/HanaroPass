import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { LanguageId } from '../../constants/language';

export type Language = {
  id: LanguageId;
  name: string;
  sub: string;
  flag: string;
};

type LanguageCardProps = {
  lang: Language;
  isSelected: boolean;
  onToggle: (id: LanguageId) => void;
};

export default function LanguageCard({
  lang,
  isSelected,
  onToggle,
}: LanguageCardProps) {
  return (
    <Button
      variant="outline"
      onClick={() => onToggle(lang.id)}
      aria-pressed={isSelected}
      className={cn(
        'h-auto w-full justify-between rounded-xl border-2 p-4 transition-all',
        isSelected
          ? 'border-green-ez bg-green-50 hover:bg-green-50 hover:text-inherit'
          : 'border-gray-100 bg-gray-50 hover:border-gray-200 hover:bg-gray-100',
      )}
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
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-ez">
          <Check className="h-4 w-4 text-white" strokeWidth={3} />
        </div>
      )}
    </Button>
  );
}
