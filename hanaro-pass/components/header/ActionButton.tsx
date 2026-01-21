// app/medical/components/ActionButton.tsx
import { Button } from '@/components/ui/button';

type ActionButtonProps = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

export default function ActionButton({
  text,
  onClick,
  disabled = false,
  className = '',
}: ActionButtonProps) {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      className={`w-full rounded-xl py-6 font-normal text-base transition-all ${
        !disabled
          ? 'bg-hana-green text-white shadow-md hover:bg-hana-green/80 active:scale-[0.98]'
          : 'cursor-not-allowed bg-gray-200 text-gray-400'
      } ${className}`}
    >
      {text}
    </Button>
  );
}
