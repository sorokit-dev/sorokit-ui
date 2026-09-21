import type { SorobanNetwork } from '../types';

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

export interface NetworkBadgeProps {
  network: SorobanNetwork;
  expected?: SorobanNetwork;
  className?: string;
}

const networkDotClass: Record<SorobanNetwork, string> = {
  TESTNET: 'bg-sky-500',
  PUBLIC: 'bg-emerald-500',
  FUTURENET: 'bg-violet-500',
};

function formatNetwork(network: SorobanNetwork): string {
  return network.charAt(0).toUpperCase() + network.slice(1).toLowerCase();
}

/**
 * @example
 * ```tsx
 * <NetworkBadge network={network} expected="TESTNET" />
 * ```
 */
export function NetworkBadge({ network, expected, className }: NetworkBadgeProps) {
  const mismatch = Boolean(expected && expected !== network);

  return (
    <span
      className={cx(
        'inline-flex min-h-7 items-center gap-2 rounded-md border px-2.5 py-1 text-xs font-semibold',
        mismatch
          ? 'border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-500/60 dark:bg-amber-950/40 dark:text-amber-100'
          : 'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200',
        className,
      )}
    >
      <span className={cx('h-2 w-2 rounded-full', networkDotClass[network])} aria-hidden="true" />
      <span>
        {mismatch
          ? `${formatNetwork(network)} - switch to ${formatNetwork(expected as SorobanNetwork)}`
          : formatNetwork(network)}
      </span>
    </span>
  );
}
