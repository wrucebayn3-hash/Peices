import { cn, getInitials } from "@/lib/utils";
import Image from "next/image";

type AvatarSize = "sm" | "md" | "lg";

interface AvatarProps {
  name: string;
  size?: AvatarSize;
  src?: string | null;
  className?: string;
}

const sizeMap: Record<AvatarSize, { px: string; text: string; dim: number }> = {
  sm: { px: "h-8 w-8", text: "text-xs", dim: 32 },
  md: { px: "h-10 w-10", text: "text-sm", dim: 40 },
  lg: { px: "h-16 w-16", text: "text-xl", dim: 64 },
};

const colors = [
  "bg-blue-100 text-blue-700",
  "bg-purple-100 text-purple-700",
  "bg-teal-100 text-teal-700",
  "bg-orange-100 text-orange-700",
  "bg-pink-100 text-pink-700",
];

function colorForName(name: string) {
  const idx = name.charCodeAt(0) % colors.length;
  return colors[idx];
}

export function Avatar({ name, size = "md", src, className }: AvatarProps) {
  const { px, text, dim } = sizeMap[size];
  const initials = getInitials(name);

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center overflow-hidden shrink-0 font-semibold",
        px,
        !src && colorForName(name),
        className
      )}
    >
      {src ? (
        <Image src={src} alt={name} width={dim} height={dim} className="object-cover" />
      ) : (
        <span className={text}>{initials}</span>
      )}
    </div>
  );
}
