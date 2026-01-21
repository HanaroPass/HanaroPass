import type { LucideIcon } from 'lucide-react';

type SectionHeaderProps = {
  icon: LucideIcon;
  title: string;
};

export default function SectionHeader({
  icon: Icon,
  title,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2 px-6 pt-6">
      <Icon className="h-5 w-5 text-hana-green" strokeWidth={2.5} />
      <h2 className="font-sans font-semibold text-base text-primary">
        {title}
      </h2>
    </div>
  );
}
