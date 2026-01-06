'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import WalletButton from '@/components/WalletButton';
import { Market } from '@/types';

const INITIAL_MARKETS: Market[] = [
  {
    id: '1',
    title: 'Attack on Titan Final Movie',
    description: 'Will the final movie be announced in 2026?',
    imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800',
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
    imageUrl: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800',
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
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800',
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

export default function MarketPage() {
  const params = useParams();
  const router = useRouter();
  const { connected } = useWallet();
  const [market, setMarket] = useState<Market | null>(null);
  const [betAmount, setBetAmount] = useState('');

  useEffect(() => {
    // Find market from initial markets or localStorage
    const allMarkets = [...INITIAL_MARKETS];
    const stored = localStorage.getItem('markets');
    if (stored) {
      allMarkets.push(...JSON.parse(stored));
    }

    const foundMarket = allMarkets.find(m => m.id === params.id);
    setMarket(foundMarket || null);
  }, [params.id]);

  if (!market) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Market not found</h1>
          <button
            onClick={() => router.push('/')}
            className="text-blue-400 hover:text-blue-300"
          >
            Return to homepage
          </button>
        </div>
      </div>
    );
  }

  const formatVolume = (volume: number) => {
    if (volume >= 1000) return `$${(volume / 1000).toFixed(1)}K`;
    return `$${volume}`;
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/')}
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              ← Anime Market
            </button>
            <WalletButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Market Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Market Image */}
            {market.imageUrl && (
              <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-900">
                <img
                  src={market.imageUrl}
                  alt={market.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Market Title & Description */}
            <div>
              <h1 className="text-3xl font-bold mb-3">{market.title}</h1>
              <p className="text-gray-400 text-lg leading-relaxed">{market.description}</p>
            </div>

            {/* Market Stats */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Total Volume</p>
                  <p className="text-xl font-bold">{formatVolume(market.volume)}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Category</p>
                  <p className="text-xl font-semibold capitalize">{market.category.replace('-', ' ')}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">End Date</p>
                  <p className="text-xl font-semibold">{new Date(market.endDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Status Banner */}
            {market.status === 'pending' && (
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                  <div>
                    <p className="text-yellow-500 font-semibold">Awaiting Aggregation & Liquidity</p>
                    <p className="text-gray-400 text-sm mt-1">This market is pending admin approval and liquidity setup</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Betting Interface */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6">Place Your Bet</h2>

                {/* Current Odds */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
                    <p className="text-green-400 text-3xl font-bold">{market.yesPercentage}%</p>
                    <p className="text-gray-400 text-sm mt-1">Yes</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-center">
                    <p className="text-red-400 text-3xl font-bold">{market.noPercentage}%</p>
                    <p className="text-gray-400 text-sm mt-1">No</p>
                  </div>
                </div>

                {/* Bet Amount Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Amount (SOL)
                  </label>
                  <input
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 opacity-50 cursor-not-allowed"
                    placeholder="0.00"
                    disabled
                  />
                </div>

                {/* Bet Buttons - Greyed Out */}
                <div className="space-y-3">
                  <button
                    disabled
                    className="w-full bg-green-600/20 text-green-400/40 border border-green-500/20 rounded-lg px-4 py-3 font-semibold cursor-not-allowed"
                  >
                    Bet Yes
                  </button>
                  <button
                    disabled
                    className="w-full bg-red-600/20 text-red-400/40 border border-red-500/20 rounded-lg px-4 py-3 font-semibold cursor-not-allowed"
                  >
                    Bet No
                  </button>
                </div>

                {/* Awaiting Liquidity Message */}
                <div className="mt-6 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
                  <p className="text-yellow-500/70 text-sm text-center">
                    ⏳ Awaiting Liquidity
                  </p>
                  <p className="text-gray-500 text-xs text-center mt-1">
                    Betting will be enabled once liquidity is added
                  </p>
                </div>

                {!connected && (
                  <div className="mt-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                    <p className="text-blue-400 text-sm text-center">
                      Connect your wallet to place bets
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
