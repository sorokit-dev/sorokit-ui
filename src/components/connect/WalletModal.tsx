import type { WalletId } from "../../types";
import { Modal } from "../shared/Modal";
import { Button } from "../shared/Button";
import { WalletIcon } from "./WalletIcon";

const SUPPORTED_WALLETS: { id: WalletId; label: string }[] = [
  { id: "freighter" as WalletId, label: "Freighter" },
  { id: "albedo" as WalletId, label: "Albedo" },
  { id: "xbull" as WalletId, label: "xBull" },
];

export interface WalletModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (walletId: WalletId) => void;
  connectingId?: WalletId | null;
}

export function WalletModal({ open, onOpenChange, onSelect, connectingId }: WalletModalProps) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Connect a wallet"
      description="Choose a wallet to connect to this app."
    >
      <div className="flex flex-col gap-2">
        {SUPPORTED_WALLETS.map((wallet) => (
          <Button
            key={wallet.id}
            variant="secondary"
            className="justify-start"
            disabled={connectingId === wallet.id}
            onClick={() => onSelect(wallet.id)}
          >
            <WalletIcon walletId={wallet.id} />
            {connectingId === wallet.id ? `Connecting to ${wallet.label}…` : wallet.label}
          </Button>
        ))}
      </div>
    </Modal>
  );
}
