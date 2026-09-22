// Connect
export { ConnectButton } from "./components/ConnectButton";
export type { ConnectButtonProps } from "./components/ConnectButton";
export { WalletModal } from "./components/connect/WalletModal";
export { WalletIcon } from "./components/connect/WalletIcon";

// Address and network
export { AddressChip, truncateAddress } from "./components/AddressChip";
export type { AddressChipProps } from "./components/AddressChip";
export { NetworkBadge } from "./components/NetworkBadge";
export type { NetworkBadgeProps } from "./components/NetworkBadge";
export { TransactionToast } from "./components/TransactionToast";
export type {
	TransactionStatus,
	TransactionToastPosition,
	TransactionToastProps,
} from "./components/TransactionToast";

// Toast
export { ToastProvider, useToastContext } from "./components/toast/ToastProvider";
export { TxToast } from "./components/toast/TxToast";
export { useTxToast } from "./components/toast/useTxToast";
export type { ToastItem } from "./components/toast/ToastProvider";

// Shared primitives (exported in case consumers want to build on them)
export { Button } from "./components/shared/Button";
export type { ButtonProps } from "./components/shared/Button";
export { Modal } from "./components/shared/Modal";
export type { ModalProps } from "./components/shared/Modal";

// Hooks
export { useWalletState } from "./hooks/useWalletState";
export { useContractCall } from "./hooks/useContractCall";
export type {
	CallStatus,
	UseContractCallOptions,
	UseContractCallResult,
} from "./hooks/useContractCall";
export { useClipboard } from "./hooks/useClipboard";
export type {
	UseClipboardOptions,
	UseClipboardResult,
} from "./hooks/useClipboard";

// Shared types
export type { WalletId, SorobanNetwork } from "./types";

// Theme
import "./theme/tokens.css";
