import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

type BadgeVariant = "active" | "pending" | "declined" | "expired" | "verified" | "remote" | "onsite" | "hybrid";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  active: "bg-[var(--teal-light)] text-[var(--teal)] border-[var(--teal)]/20",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  declined: "bg-red-50 text-red-600 border-red-200",
  expired: "bg-gray-100 text-gray-500 border-gray-200",
  verified: "bg-[var(--navy)] text-white border-transparent",
  remote: "bg-purple-50 text-purple-700 border-purple-200",
  onsite: "bg-blue-50 text-blue-700 border-blue-200",
  hybrid: "bg-indigo-50 text-indigo-700 border-indigo-200",
};

export function Badge({ variant = "active", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variantStyles[variant],
        className
      )}
    >
      {variant === "verified" && <CheckCircle2 className="h-3 w-3" />}
      {children}
    </span>
  );
}
