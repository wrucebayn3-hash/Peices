import { cn } from "@/lib/utils";

interface WastaLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { icon: 20, text: "text-lg" },
  md: { icon: 28, text: "text-2xl" },
  lg: { icon: 36, text: "text-3xl" },
};

export function WastaLogo({ className, size = "md" }: WastaLogoProps) {
  const { icon, text } = sizeMap[size];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 2L29 9.5V22.5L16 30L3 22.5V9.5L16 2Z"
          fill="var(--gold)"
        />
        <path
          d="M11 16L14.5 19.5L21 13"
          stroke="var(--navy)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className={cn(
          "font-sora font-semibold text-[var(--navy)] tracking-tight",
          text
        )}
      >
        wasta
      </span>
    </div>
  );
}
