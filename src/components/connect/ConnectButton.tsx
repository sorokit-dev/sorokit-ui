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

  const handleSelect = async (id: WalletId) => {
    await connect(id);
    setModalOpen(false);
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
        connectingId={isConnecting ? (walletId as WalletId | null) : null}
      />
    </>
  );
}
