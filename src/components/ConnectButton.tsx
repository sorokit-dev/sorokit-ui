import * as React from 'react';
import type { WalletId } from '../types';
import { useClipboard } from '../hooks/useClipboard';
import { useWalletState } from '../hooks/useWalletState';
import { truncateAddress } from './AddressChip';

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

export interface ConnectButtonProps {
  walletId?: WalletId;
  className?: string;
}

const baseButtonClass =
  'inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-70 dark:focus-visible:ring-offset-slate-950';

/**
 * @example
 * ```tsx
 * <ConnectButton walletId="freighter" />
 * ```
 */
export function ConnectButton({ walletId = 'freighter', className }: ConnectButtonProps) {
  const { isConnected, isConnecting, address, connect, disconnect } = useWalletState();
  const { copied, copy } = useClipboard();
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement | null>(null);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    if (!open) return undefined;

    const menu = menuRef.current;
    const firstButton = menu?.querySelector<HTMLButtonElement>('button');
    firstButton?.focus();

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!menuRef.current?.contains(target) && !triggerRef.current?.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  const onMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusable = Array.from(menuRef.current?.querySelectorAll<HTMLButtonElement>('button') ?? []);
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const onTriggerClick = async () => {
    if (isConnected) {
      setOpen((current) => !current);
      return;
    }

    await connect(walletId);
  };

  const label = isConnecting ? 'Connecting...' : isConnected && address ? truncateAddress(address) : 'Connect Wallet';

  return (
    <div className="relative inline-flex">
      <button
        ref={triggerRef}
        type="button"
        onClick={onTriggerClick}
        disabled={isConnecting}
        className={cx(
          baseButtonClass,
          isConnected
            ? 'border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900'
            : 'bg-sky-600 text-white hover:bg-sky-700',
          className,
        )}
        aria-haspopup={isConnected ? 'menu' : undefined}
        aria-expanded={isConnected ? open : undefined}
      >
        {isConnecting ? (
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
        ) : null}
        <span>{label}</span>
      </button>

      {open && address ? (
        <div
          ref={menuRef}
          role="menu"
          onKeyDown={onMenuKeyDown}
          className="absolute right-0 top-12 z-50 w-48 rounded-md border border-slate-200 bg-white p-1 shadow-lg shadow-slate-950/10 dark:border-slate-700 dark:bg-slate-950"
        >
          <button
            type="button"
            role="menuitem"
            onClick={() => copy(address)}
            className="flex w-full items-center rounded-md px-3 py-2 text-left text-sm text-slate-900 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:text-slate-100 dark:hover:bg-slate-900"
          >
            {copied ? 'Copied' : 'Copy Address'}
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              disconnect();
            }}
            className="flex w-full items-center rounded-md px-3 py-2 text-left text-sm text-red-700 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:text-red-300 dark:hover:bg-red-950/40"
          >
            Disconnect
          </button>
        </div>
      ) : null}
    </div>
  );
}
