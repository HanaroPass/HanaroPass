export function ToggleButton({
  active,
  onClick,
  variant,
  label,
  icon,
  colorVariant = "green",
  iconColorVariant = "green",
}: {
  active: boolean;
  onClick: () => void;
  variant: "pill" | "icon";
  label?: string;
  icon: React.ReactNode;
  colorVariant?: "green" | "red";
  iconColorVariant?: "green" | "red" | "blue" | "yellow";
}) {
  const baseClass =
    variant === "pill"
      ? "flex items-center gap-1 px-3 py-2 rounded-full text-base font-semibold shadow-md"
      : "w-10 h-10 flex items-center justify-center rounded-full shadow-md";

  const activeBg = colorVariant === "red" ? "bg-red-200" : "bg-green-500";

  const iconColorMap = {
    green: "text-hana-green",
    red: "text-hana-red",
    blue: "text-blue-100",
    yellow: "text-yellow-300",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClass} transition
        ${active ? activeBg : "bg-white"}
        text-black-900
      `}
    >
      <span className={iconColorMap[iconColorVariant]}>{icon}</span>
      {label && <span>{label}</span>}
    </button>
  );
}
