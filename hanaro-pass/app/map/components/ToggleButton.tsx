type ToggleButtonProps =
  | {
      variant: "icon";
      active: boolean;
      onClick: () => void;
      icon: React.ReactNode;
      ariaLabel: string;
      colorVariant?: "green" | "red";
      iconColorVariant?: "green" | "red" | "blue" | "yellow";
      label?: never;
    }
  | {
      variant: "pill";
      active: boolean;
      onClick: () => void;
      icon: React.ReactNode;
      label: string;
      ariaLabel?: string;
      colorVariant?: "green" | "red";
      iconColorVariant?: "green" | "red" | "blue" | "yellow";
    };

export function ToggleButton({
  active,
  onClick,
  variant,
  label,
  icon,
  ariaLabel,
  colorVariant = "green",
  iconColorVariant = "green",
}: ToggleButtonProps) {
  const baseClass =
    variant === "pill"
      ? "flex items-center gap-1 px-3 py-2 rounded-full text-base font-semibold shadow-md border"
      : "w-10 h-10 flex items-center justify-center rounded-full shadow-md border";

  const borderColor = active
    ? colorVariant === "red"
      ? "border-red-600"
      : "border-green-700"
    : "border-white";

  const bgColor = active
    ? colorVariant === "red"
      ? "bg-red-200"
      : "bg-green-300"
    : "bg-white";

  const iconColorMap = {
    green: "text-hana-green",
    red: "text-hana-red",
    blue: "text-blue-100",
    yellow: "text-yellow-300",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={ariaLabel ?? label}
      className={`${baseClass} ${borderColor} ${bgColor} transition text-black-900`}
    >
      <span className={iconColorMap[iconColorVariant]}>{icon}</span>
      {variant === "pill" && <span>{label}</span>}
    </button>
  );
}
