"use client";

import * as RadixToast from "@radix-ui/react-toast";
import { CheckCircle2, AlertTriangle, XCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type ToastVariant = "success" | "warning" | "error";

interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  showToast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

const icons: Record<ToastVariant, React.ReactNode> = {
  success: <CheckCircle2 className="h-4 w-4 text-[var(--teal)]" />,
  warning: <AlertTriangle className="h-4 w-4 text-amber-500" />,
  error: <XCircle className="h-4 w-4 text-red-500" />,
};

const variantStyles: Record<ToastVariant, string> = {
  success: "border-[var(--teal)]/20",
  warning: "border-amber-200",
  error: "border-red-200",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, variant: ToastVariant = "success") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      <RadixToast.Provider swipeDirection="right">
        {children}
        {toasts.map((toast) => (
          <RadixToast.Root
            key={toast.id}
            open
            onOpenChange={(open) => {
              if (!open) setToasts((prev) => prev.filter((t) => t.id !== toast.id));
            }}
            className={cn(
              "flex items-center gap-3 bg-white border rounded-[var(--radius-md)] px-4 py-3 shadow-lg",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[swipe=end]:animate-out data-[state=closed]:fade-out-80",
              "data-[state=open]:slide-in-from-bottom-full",
              variantStyles[toast.variant]
            )}
          >
            {icons[toast.variant]}
            <RadixToast.Description className="text-sm text-[var(--text-primary)] flex-1">
              {toast.message}
            </RadixToast.Description>
            <RadixToast.Close className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
              <X className="h-3.5 w-3.5" />
            </RadixToast.Close>
          </RadixToast.Root>
        ))}
        <RadixToast.Viewport className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-80 max-w-[calc(100vw-2rem)]" />
      </RadixToast.Provider>
    </ToastContext.Provider>
  );
}
