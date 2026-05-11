"use client";

import { cn } from "@/lib/utils";

interface CreditBarProps {
  used: number;
  limit: number;
  label?: string;
  className?: string;
}

export function CreditBar({ used, limit, label, className }: CreditBarProps) {
  const pct = limit > 0 ? Math.min((used / limit) * 100, 100) : 0;
  const isAmber = pct >= 80 && pct < 100;
  const isRed = pct >= 100;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <div className="flex justify-between items-center text-xs text-[var(--text-secondary)]">
          <span>{label}</span>
          <span className={cn(isRed && "text-red-500 font-medium", isAmber && "text-amber-600 font-medium")}>
            {used} / {limit} used
          </span>
        </div>
      )}
      <div className="h-2 w-full rounded-full bg-[var(--surface-2)] overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            isRed
              ? "bg-red-500"
              : isAmber
              ? "bg-amber-400"
              : "bg-[var(--teal)]"
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
