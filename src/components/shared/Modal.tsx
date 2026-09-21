import { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Wraps Radix Dialog so we get focus trapping, ESC-to-close, and correct
 * aria-labelledby/aria-describedby wiring for free — we only own styling.
 */
export function Modal({ open, onOpenChange, title, description, children, className }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 data-[state=open]:animate-in data-[state=open]:fade-in" />
        <Dialog.Content
          className={clsx(
            "fixed left-1/2 top-1/2 w-full max-w-sm -translate-x-1/2 -translate-y-1/2",
            "rounded-sorokit border border-sorokit-border bg-sorokit-bg p-6 shadow-xl",
            "focus:outline-none",
            className
          )}
        >
          <Dialog.Title className="text-base font-semibold text-sorokit-text">{title}</Dialog.Title>
          {description && (
            <Dialog.Description className="mt-1 text-sm text-sorokit-text-muted">
              {description}
            </Dialog.Description>
          )}
          <div className="mt-4">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
