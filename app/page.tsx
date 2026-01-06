'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import WalletButton from '@/components/WalletButton';
import CreateMarketModal from '@/components/CreateMarketModal';
import MarketCard from '@/components/MarketCard';
import { Market } from '@/types';

const INITIAL_MARKETS: Market[] = [
  {
    id: '1',
    title: 'Attack on Titan Final Movie',
    description: 'Will the final movie be announced in 2026?',
    category: 'anime-release',
    status: 'active',
    yesPercentage: 68,
    noPercentage: 32,
    volume: 12500,
    createdBy: 'system',
    createdAt: new Date(),
    endDate: new Date('2026-12-31'),
  },
  {
    id: '2',
    title: 'One Piece Chapter 1200',
    description: 'Will Luffy defeat Blackbeard before chapter 1200?',
    category: 'manga-chapter',
    status: 'active',
    yesPercentage: 32,
    noPercentage: 68,
    volume: 8300,
    createdBy: 'system',
    createdAt: new Date(),
    endDate: new Date('2026-06-30'),
  },
  {
    id: '3',
    title: 'Jujutsu Kaisen Season 3',
    description: 'Will Season 3 be announced by July 2026?',
    category: 'anime-release',
    status: 'active',
    yesPercentage: 85,
    noPercentage: 15,
    volume: 21700,
    createdBy: 'system',
    createdAt: new Date(),
    endDate: new Date('2026-07-31'),
  },
];

export default function Home() {
  const { connected } = useWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [markets, setMarkets] = useState<Market[]>(INITIAL_MARKETS);

  useEffect(() => {
    // Load markets from localStorage
    const stored = localStorage.getItem('markets');
    if (stored) {
      const storedMarkets = JSON.parse(stored);
      setMarkets([...INITIAL_MARKETS, ...storedMarkets]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Anime Market
              </h1>
              <p className="text-gray-400 text-sm">Prediction Markets for Anime & Manga</p>
            </div>

            <div className="flex items-center gap-3">
              {connected && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Create Market
                </button>
              )}
              <WalletButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8 text-center py-8">
          <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Active Markets
          </h2>
          <p className="text-gray-400 text-lg">Bet on anime releases and manga predictions</p>
        </div>

        {/* Markets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {markets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>

        {markets.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No markets available yet</p>
            {connected && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 text-blue-400 hover:text-blue-300 transition-colors"
              >
                Create the first market
              </button>
            )}
          </div>
        )}
      </main>

      {/* Create Market Modal */}
      <CreateMarketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
