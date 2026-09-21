import { useMemo } from "react";
import { useWallet as useCoreWallet } from "@sorokit/core";

/**
 * Thin state-shaping layer over @sorokit/core's real useWallet():
 *
 *   const { account, status, error, adapter, connect, disconnect } = useWallet();
 *   connect(walletId) — wallet is chosen at call time, not at mount time.
 *
 * This is intentional: sorokit-ui owns UI-flavored state (isConnected,
 * isConnecting, address naming); core stays a thin wrapper over the SDK.
 */
export function useWalletState() {
  const { account, status, error, adapter, connect, disconnect } = useCoreWallet();

  const derived = useMemo(
    () => ({
      isConnected: status === "connected",
      isConnecting: status === "connecting",
    }),
    [status]
  );

  return {
    status,
    address: account?.publicKey ?? null,
    walletId: adapter?.id ?? null,
    error: error ?? null,
    isConnected: derived.isConnected,
    isConnecting: derived.isConnecting,
    connect,
    disconnect,
  };
}
