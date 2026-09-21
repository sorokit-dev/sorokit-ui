import type { WalletId } from "../../types";
import freighterIcon from "../../assets/icons/freighter.svg";
import albedoIcon from "../../assets/icons/albedo.svg";
import xbullIcon from "../../assets/icons/xbull.svg";

const ICONS: Record<WalletId, string> = {
  freighter: freighterIcon,
  albedo: albedoIcon,
  xbull: xbullIcon,
};

export interface WalletIconProps {
  walletId: WalletId;
  size?: number;
}

export function WalletIcon({ walletId, size = 20 }: WalletIconProps) {
  const src = ICONS[walletId];
  return (
    <img
      src={src}
      alt=""
      role="presentation"
      width={size}
      height={size}
      className="shrink-0"
    />
  );
}
