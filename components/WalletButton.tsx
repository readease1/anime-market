'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function WalletButton() {
  const { connected, publicKey } = useWallet();

  if (!connected) {
    return (
      <WalletMultiButton className="!bg-gradient-to-r !from-indigo-600 !to-purple-600 hover:!from-indigo-500 hover:!to-purple-500 !rounded-xl !px-5 !py-2.5 !font-semibold !transition-all !duration-200 !shadow-lg !shadow-indigo-500/25 hover:!shadow-indigo-500/40" />
    );
  }

  return (
    <div className="flex items-center gap-3 bg-[#16161f] border border-[#1f1f28] hover:border-indigo-500/30 rounded-xl px-4 py-2.5 transition-all duration-200 group">
      <div className="relative flex items-center justify-center">
        <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"></div>
        <div className="absolute inset-0 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">Connected</span>
        <span className="text-sm font-mono text-white tracking-tight -mt-0.5">
          {publicKey?.toBase58().slice(0, 4)}...{publicKey?.toBase58().slice(-4)}
        </span>
      </div>
    </div>
  );
}
