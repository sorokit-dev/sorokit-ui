import * as React from 'react';
import type { SorobanNetwork } from '../types';
import { useClipboard } from '../hooks/useClipboard';

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

export interface AddressChipProps {
  address: string;
  network?: SorobanNetwork;
  className?: string;
}

export function truncateAddress(address: string): string {
  if (address.length <= 12) return address;
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

const networkDotClass: Record<SorobanNetwork, string> = {
  TESTNET: 'bg-sky-500',
  PUBLIC: 'bg-emerald-500',
  FUTURENET: 'bg-violet-500',
};

/**
 * @example
 * ```tsx
 * <AddressChip address={address} network="TESTNET" />
 * ```
 */
export function AddressChip({ address, network, className }: AddressChipProps) {
  const { copied, copy } = useClipboard();
  const label = copied ? 'Copied' : truncateAddress(address);

  return (
    <button
      type="button"
      onClick={() => copy(address)}
      className={cx(
        'inline-flex h-9 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-900 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900 dark:focus-visible:ring-offset-slate-950',
        className,
      )}
      aria-label={copied ? 'Address copied' : 'Copy address'}
    >
      {network ? (
        <span
          className={cx('h-2 w-2 rounded-full', networkDotClass[network])}
          aria-hidden="true"
        />
      ) : null}
      <span>{label}</span>
    </button>
  );
}
