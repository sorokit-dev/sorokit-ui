import { useState } from "react";
import type { WalletId } from "../../types";
import { useWalletState } from "../../hooks/useWalletState";
import { Button } from "../shared/Button";
import { WalletModal } from "./WalletModal";
import { WalletIcon } from "./WalletIcon";

function truncate(address: string) {
  return `${address.slice(0, 4)}…${address.slice(-4)}`;
}

export function ConnectButton() {
  const { isConnected, isConnecting, address, walletId, connect, disconnect } = useWalletState();
  const [modalOpen, setModalOpen] = useState(false);
  // The wallet the user just picked. useWalletState's walletId only becomes
  // set once the connection succeeds, so it cannot identify the wallet that
  // is currently connecting.
  const [pendingId, setPendingId] = useState<WalletId | null>(null);

  const handleSelect = async (id: WalletId) => {
    setPendingId(id);
    try {
      await connect(id);
    } finally {
      setPendingId(null);
      setModalOpen(false);
    }
  };

  if (isConnected && address) {
    return (
      <Button variant="secondary" onClick={disconnect}>
        {walletId && <WalletIcon walletId={walletId as WalletId} size={16} />}
        {truncate(address)}
      </Button>
    );
  }

  return (
    <>
      <Button onClick={() => setModalOpen(true)} disabled={isConnecting}>
        {isConnecting ? "Connecting…" : "Connect Wallet"}
      </Button>
      <WalletModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSelect={handleSelect}
        connectingId={isConnecting ? pendingId : null}
      />
    </>
  );
}
