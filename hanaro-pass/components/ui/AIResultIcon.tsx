import { Sparkles } from 'lucide-react';

const sizeConfig = {
  sm: { container: 'h-6 w-6', icon: 'h-3 w-3' },
  lg: { container: 'h-16 w-16', icon: 'h-8 w-8' },
};
export default function AIResultIcon({ size = 'lg' }: { size?: 'sm' | 'lg' }) {
  const { container, icon } = sizeConfig[size];
  return (
    <div
      className={`inline-flex ${container} items-center justify-center rounded-full bg-linear-to-br from-purple-400 to-cyan-500`}
    >
      <Sparkles className={`${icon} text-white`} />
    </div>
  );
}
