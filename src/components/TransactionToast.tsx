import * as React from 'react';

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

export type TransactionStatus = 'idle' | 'pending' | 'success' | 'error';
export type TransactionToastPosition = 'top-right' | 'bottom-right' | 'top-center';

export interface TransactionToastProps {
  status: TransactionStatus;
  error?: unknown;
  successMessage?: string;
  position?: TransactionToastPosition;
  className?: string;
}

const positionClass: Record<TransactionToastPosition, string> = {
  'top-right': 'right-4 top-4',
  'bottom-right': 'bottom-4 right-4',
  'top-center': 'left-1/2 top-4 -translate-x-1/2',
};

function getErrorMessage(error: unknown): string {
  if (!error) return 'Transaction failed.';
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'Transaction failed.';
}

/**
 * @example
 * ```tsx
 * const { status, error } = useContract(contractId);
 * <TransactionToast status={status} error={error} successMessage="Swap confirmed" />
 * ```
 */
export function TransactionToast({
  status,
  error,
  successMessage = 'Transaction confirmed.',
  position = 'bottom-right',
  className,
}: TransactionToastProps) {
  const [dismissed, setDismissed] = React.useState(false);

  React.useEffect(() => {
    setDismissed(false);

    if (status !== 'success') return undefined;

    const timer = setTimeout(() => setDismissed(true), 4000);
    return () => clearTimeout(timer);
  }, [status, successMessage]);

  if (status === 'idle' || dismissed) return null;

  const isError = status === 'error';
  const title =
    status === 'pending'
      ? 'Transaction pending'
      : status === 'success'
        ? successMessage
        : getErrorMessage(error);

  return (
    <div
      className={cx(
        'fixed z-50 w-[calc(100vw-2rem)] max-w-sm rounded-md border bg-white p-4 text-sm shadow-lg shadow-slate-950/10 dark:bg-slate-950',
        isError
          ? 'border-red-300 text-red-950 dark:border-red-700 dark:text-red-100'
          : 'border-slate-200 text-slate-900 dark:border-slate-700 dark:text-slate-100',
        positionClass[position],
        className,
      )}
      role={isError ? 'alert' : 'status'}
      aria-live={isError ? 'assertive' : 'polite'}
    >
      <div className="flex items-start gap-3">
        {status === 'pending' ? (
          <span
            className="mt-0.5 h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-sky-600 border-t-transparent"
            aria-hidden="true"
          />
        ) : (
          <span
            className={cx(
              'mt-1 h-2.5 w-2.5 shrink-0 rounded-full',
              status === 'success' ? 'bg-emerald-500' : 'bg-red-500',
            )}
            aria-hidden="true"
          />
        )}
        <div className="min-w-0 flex-1">
          <p className="font-semibold">{title}</p>
          {status === 'pending' ? (
            <p className="mt-1 text-slate-600 dark:text-slate-300">Waiting for network confirmation.</p>
          ) : null}
        </div>
        {status !== 'pending' ? (
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="rounded-md p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100 dark:focus-visible:ring-offset-slate-950"
            aria-label="Dismiss transaction notification"
          >
            <span aria-hidden="true">x</span>
          </button>
        ) : null}
      </div>
    </div>
  );
}
