'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function WalletButton() {
  const { connected, publicKey } = useWallet();

  if (!connected) {
    return (
      <WalletMultiButton className="!bg-blue-600 hover:!bg-blue-700 !rounded-lg !px-4 !py-2 !font-medium transition-colors" />
    );
  }

  return (
    <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2">
      <div className="relative">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
      </div>
      <span className="text-sm font-mono text-gray-300">
        {publicKey?.toBase58().slice(0, 4)}...{publicKey?.toBase58().slice(-4)}
      </span>
    </div>
  );
}
