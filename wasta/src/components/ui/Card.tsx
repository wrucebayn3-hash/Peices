import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ hover = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white border border-[var(--border)] rounded-[var(--radius-lg)] p-5",
        hover && "transition-all duration-150 hover:shadow-md hover:-translate-y-0.5 hover:border-[var(--gold)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
