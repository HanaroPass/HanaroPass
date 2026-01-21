import Image from 'next/image';
import {
  BENEFIT_BANNER_COPY,
  type BenefitBannerVariant,
  COUNTRY_LABEL,
} from '@/constants/benefitBanner';

type BenefitBannerProps = {
  variant: BenefitBannerVariant;
  countryCode: keyof typeof COUNTRY_LABEL | string;
  name: string;
  className?: string;
  onClick?: () => void;
};

export default function BenefitBanner({
  variant,
  countryCode,
  name,
  className,
  onClick,
}: BenefitBannerProps) {
  const cfg = BENEFIT_BANNER_COPY[variant];
  const country = COUNTRY_LABEL[countryCode] ?? countryCode;

  const toneClass = cfg.tone === 'dark' ? 'text-white' : 'text-black-900';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full overflow-hidden bg-white transition-opacity active:opacity-95 ${className}`}
    >
      <Image
        src={cfg.imageSrc}
        alt={cfg.imageAlt}
        width={375}
        height={150}
        className="h-37.5 w-full object-cover"
        priority
      />

      {cfg.badge && (
        <div className="absolute top-3 right-3">
          <span className="rounded-full bg-green-ez px-3 py-1 font-bold text-[10px] text-white">
            {cfg.badge}
          </span>
        </div>
      )}

      <div
        className={`absolute flex flex-col ${cfg.textAlign} ${toneClass}`}
        style={{
          top: cfg.contentPos.top,
          left: cfg.contentPos.left,
          right: cfg.contentPos.right,
          transform:
            cfg.contentPos.left === '50%' ? 'translateX(-50%)' : 'none',
          width: cfg.contentPos.left === '50%' ? '100%' : 'auto',
        }}
      >
        <p className="font-bold text-[22px] leading-tight tracking-tight">
          {country}에서 오신 {name} 손님,
        </p>
        <p className="font-medium text-base opacity-90">{cfg.subtitle}</p>
      </div>

      <div
        className={`absolute flex items-center gap-0.5 font-medium text-[11px] opacity-60 ${toneClass}`}
        style={{
          bottom: cfg.ctaPos.bottom,
          left: cfg.ctaPos.left,
          right: cfg.ctaPos.right,
        }}
      >
        <span>{cfg.cta}</span>
        <span className="text-[14px] leading-none">›</span>
      </div>
    </button>
  );
}
