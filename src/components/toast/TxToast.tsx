import * as ToastPrimitive from "@radix-ui/react-toast";
import clsx from "clsx";
import type { ToastItem } from "./ToastProvider";

const phaseStyles: Record<ToastItem["phase"], string> = {
  pending: "border-sorokit-pending/40 bg-sorokit-pending/10",
  success: "border-sorokit-success/40 bg-sorokit-success/10",
  failed: "border-sorokit-danger/40 bg-sorokit-danger/10",
};

const phaseLabel: Record<ToastItem["phase"], string> = {
  pending: "Transaction pending",
  success: "Transaction confirmed",
  failed: "Transaction failed",
};

export function TxToast({ toast, onDismiss }: { toast: ToastItem; onDismiss: () => void }) {
  return (
    <ToastPrimitive.Root
      className={clsx(
        "rounded-sorokit border p-3 shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        phaseStyles[toast.phase]
      )}
      duration={toast.phase === "pending" ? Infinity : 5000}
      onOpenChange={(open) => !open && onDismiss()}
    >
      <ToastPrimitive.Title className="text-sm font-medium text-sorokit-text">
        {phaseLabel[toast.phase]}
      </ToastPrimitive.Title>
      <ToastPrimitive.Description className="mt-1 text-xs text-sorokit-text-muted">
        {toast.message ?? `${toast.hash.slice(0, 8)}…${toast.hash.slice(-6)}`}
      </ToastPrimitive.Description>
      <ToastPrimitive.Close
        className="mt-2 text-xs font-medium text-sorokit-accent hover:underline"
        aria-label="Dismiss"
      >
        Dismiss
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  );
}
