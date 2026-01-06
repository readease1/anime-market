'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

const WalletProviderDynamic = dynamic(
  () => import('./WalletProvider').then((mod) => mod.SolanaWalletProvider),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    ),
  }
);

export default function ClientWalletProvider({ children }: { children: ReactNode }) {
  return <WalletProviderDynamic>{children}</WalletProviderDynamic>;
}
