import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[var(--text-primary)]"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "h-11 w-full rounded-[var(--radius-md)] border px-3.5 text-sm bg-white",
            "border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)]",
            "transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)]",
            error && "border-red-400 focus:ring-red-400 focus:border-red-400",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-500">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-xs text-[var(--text-muted)]">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
