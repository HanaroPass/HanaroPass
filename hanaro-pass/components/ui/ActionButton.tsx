import { Button } from '@/components/ui/button';

type ActionButtonProps = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  invert?: boolean;
};

export default function ActionButton({
  text,
  onClick,
  disabled = false,
  className = '',
  invert = false,
}: ActionButtonProps) {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      className={`w-full rounded-xl py-6 font-normal text-base transition-all ${
        !disabled
          ? invert
            ? 'border-2 border-green-ez bg-white text-green-ez hover:bg-green-ez/10 active:scale-[0.98]'
            : 'bg-green-ez text-white shadow-md hover:bg-green-ez/80 active:scale-[0.98]'
          : 'cursor-not-allowed bg-gray-200 text-gray-400'
      } ${className}`}
    >
      {text}
    </Button>
  );
}
