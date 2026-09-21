import { useCallback } from "react";
import { useToastContext } from "./ToastProvider";

let counter = 0;
const nextId = () => `tx-toast-${++counter}`;

/**
 * Drives a toast off a submitted transaction promise directly, rather than
 * subscribing to a hash-keyed event stream — core doesn't currently expose
 * one (see API-mismatch review), and the promise from useContractCall's
 * call() already carries pending/success/error naturally.
 *
 * Usage:
 *   const { track } = useTxToast();
 *   track(call("transfer", to, amount), { label: "Transfer" });
 */
export function useTxToast() {
  const { upsert } = useToastContext();

  const track = useCallback(
    async <T,>(promise: Promise<T>, opts?: { label?: string }) => {
      const id = nextId();
      upsert({ id, hash: id, phase: "pending", message: opts?.label });
      try {
        const value = await promise;
        upsert({ id, hash: id, phase: "success", message: opts?.label });
        return value;
      } catch (err) {
        upsert({
          id,
          hash: id,
          phase: "failed",
          message: err instanceof Error ? err.message : opts?.label,
        });
        throw err;
      }
    },
    [upsert]
  );

  return { track };
}
