import { createContext, ReactNode, useCallback, useContext, useReducer } from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { TxToast } from "./TxToast";

export type TxPhase = "pending" | "success" | "failed";

export interface ToastItem {
  id: string;
  hash: string;
  phase: TxPhase;
  message?: string;
}

type Action =
  | { type: "upsert"; item: ToastItem }
  | { type: "dismiss"; id: string };

function reducer(state: ToastItem[], action: Action): ToastItem[] {
  switch (action.type) {
    case "upsert": {
      const existing = state.findIndex((t) => t.hash === action.item.hash);
      if (existing === -1) return [...state, action.item];
      const next = [...state];
      next[existing] = action.item;
      return next;
    }
    case "dismiss":
      return state.filter((t) => t.id !== action.id);
    default:
      return state;
  }
}

interface ToastContextValue {
  toasts: ToastItem[];
  upsert: (item: ToastItem) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, dispatch] = useReducer(reducer, []);

  const upsert = useCallback((item: ToastItem) => dispatch({ type: "upsert", item }), []);
  const dismiss = useCallback((id: string) => dispatch({ type: "dismiss", id }), []);

  return (
    <ToastContext.Provider value={{ toasts, upsert, dismiss }}>
      <ToastPrimitive.Provider swipeDirection="right">
        {children}
        {toasts.map((toast) => (
          <TxToast key={toast.id} toast={toast} onDismiss={() => dismiss(toast.id)} />
        ))}
        <ToastPrimitive.Viewport className="fixed bottom-4 right-4 z-50 flex w-80 flex-col gap-2 outline-none" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToastContext must be used within a ToastProvider");
  return ctx;
}
