import React from 'react';
import { Button } from '../shared/Button';

export interface ConnectButtonProps {
  label?: string;
  isConnected?: boolean;
  address?: string;
  onClick?: () => void;
}

export const ConnectButton: React.FC<ConnectButtonProps> = ({ 
  label = "Connect Wallet", 
  isConnected, 
  address, 
  onClick 
}) => {
  return (
    <Button 
      variant={isConnected ? "outline" : "primary"}
      onClick={onClick}
      className="font-semibold shadow-sm"
    >
      {isConnected && address ? (
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          {address.slice(0, 4)}...{address.slice(-4)}
        </div>
      ) : (
        label
      )}
    </Button>
  );
};