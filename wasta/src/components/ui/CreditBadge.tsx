"use client";

import { cn } from "@/lib/utils";

interface CreditBadgeProps {
  credits: number;
  className?: string;
  pulse?: boolean;
}

export function CreditBadge({ credits, className, pulse }: CreditBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full",
        "bg-[var(--gold)] text-[var(--navy)] font-semibold text-sm",
        pulse && "credit-pulse",
        className
      )}
    >
      <span className="text-base leading-none">⬡</span>
      <span>{credits} credits</span>
    </span>
  );
}
