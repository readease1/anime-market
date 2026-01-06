'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import WalletButton from '@/components/WalletButton';
import { Market } from '@/types';

const INITIAL_MARKETS: Market[] = [
  {
    id: '1',
    title: 'Will Attack on Titan Final Movie be announced in 2026?',
    description: 'Prediction on whether MAPPA will officially announce the final Attack on Titan theatrical release before December 31, 2026.',
    imageUrl: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&q=80',
    category: 'anime-release',
    status: 'active',
    yesPercentage: 68,
    noPercentage: 32,
    volume: 125000,
    createdBy: 'system',
    createdAt: new Date(),
    endDate: new Date('2026-12-31'),
  },
  {
    id: '2',
    title: 'Luffy vs Blackbeard showdown before One Piece Chapter 1200?',
    description: 'Will the highly anticipated Luffy vs Blackbeard confrontation occur before One Piece reaches chapter 1200?',
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&q=80',
    category: 'manga-chapter',
    status: 'active',
    yesPercentage: 34,
    noPercentage: 66,
    volume: 89000,
    createdBy: 'system',
    createdAt: new Date(),
    endDate: new Date('2026-06-30'),
  },
  {
    id: '3',
    title: 'Jujutsu Kaisen Season 3 announcement by July 2026?',
    description: 'Will MAPPA officially announce Jujutsu Kaisen Season 3 production before July 31, 2026?',
    imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80',
    category: 'anime-release',
    status: 'active',
    yesPercentage: 82,
    noPercentage: 18,
    volume: 217000,
    createdBy: 'system',
    createdAt: new Date(),
    endDate: new Date('2026-07-31'),
  },
  {
    id: '4',
    title: 'Demon Slayer movie to break $500M box office worldwide?',
    description: 'Will the upcoming Demon Slayer movie surpass $500 million in worldwide box office revenue?',
    imageUrl: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=800&q=80',
    category: 'industry',
    status: 'active',
    yesPercentage: 71,
    noPercentage: 29,
    volume: 156000,
    createdBy: 'system',
    createdAt: new Date(),
    endDate: new Date('2027-03-31'),
  },
  {
    id: '5',
    title: 'My Hero Academia manga ending in 2026?',
    description: 'Will Kohei Horikoshi conclude the My Hero Academia manga series before December 31, 2026?',
    imageUrl: 'https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?w=800&q=80',
    category: 'manga-chapter',
    status: 'active',
    yesPercentage: 45,
    noPercentage: 55,
    volume: 103000,
    createdBy: 'system',
    createdAt: new Date(),
    endDate: new Date('2026-12-31'),
  },
  {
    id: '6',
    title: 'Chainsaw Man Season 2 to be announced at Anime Expo 2026?',
    description: 'Will MAPPA announce Chainsaw Man Season 2 during the Anime Expo 2026 event?',
    imageUrl: 'https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=800&q=80',
    category: 'anime-release',
    status: 'active',
    yesPercentage: 58,
    noPercentage: 42,
    volume: 94000,
    createdBy: 'system',
    createdAt: new Date(),
    endDate: new Date('2026-07-05'),
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
      <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">
        {/* Animated Background Pattern */}
        <div className="fixed inset-0 z-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.05) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative z-10 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-indigo-500/30">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2">Market not found</h1>
            <p className="text-gray-400 mb-6">This prediction market doesn't exist or has been removed</p>
          </div>
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
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
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 z-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.05) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Header - Glossy Glass Effect */}
      <header className="border-b border-white/10 bg-gradient-to-b from-[#13131a]/60 to-[#13131a]/40 backdrop-blur-2xl sticky top-0 z-50 shadow-2xl shadow-black/20"
        style={{
          background: 'linear-gradient(to bottom, rgba(19, 19, 26, 0.8), rgba(19, 19, 26, 0.6))',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 text-lg font-bold hover:opacity-80 transition-opacity group"
            >
              <svg className="w-5 h-5 text-indigo-400 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="gradient-text">Anime Market</span>
            </button>
            <WalletButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Market Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Market Image */}
            {market.imageUrl && (
              <div className="aspect-video w-full overflow-hidden rounded-xl bg-[#13131a] border border-[#1f1f28]">
                <img
                  src={market.imageUrl}
                  alt={market.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Market Title & Description */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">{market.title}</h1>
              <p className="text-gray-400 text-lg leading-relaxed">{market.description}</p>
            </div>

            {/* Market Stats */}
            <div className="bg-[#13131a]/50 border border-[#1f1f28] rounded-xl p-6 backdrop-blur-sm">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider">Total Volume</p>
                  <p className="text-2xl font-bold text-white">{formatVolume(market.volume)}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider">Category</p>
                  <p className="text-xl font-semibold text-indigo-400 capitalize">{market.category.replace('-', ' ')}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider">End Date</p>
                  <p className="text-xl font-semibold text-white">{new Date(market.endDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Status Banner */}
            {market.status === 'pending' && (
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-5">
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-yellow-500 rounded-full animate-ping"></div>
                  </div>
                  <div>
                    <p className="text-yellow-400 font-semibold text-lg">Awaiting Aggregation & Liquidity</p>
                    <p className="text-gray-400 text-sm mt-1">This market is pending admin approval and liquidity setup</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Betting Interface */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-[#13131a]/60 border border-[#1f1f28] rounded-xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold mb-6">Place Your Bet</h2>

                {/* Current Odds */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-center hover:bg-emerald-500/15 transition-colors">
                    <p className="text-emerald-400 text-3xl font-bold">{market.yesPercentage}%</p>
                    <p className="text-gray-400 text-sm mt-1 uppercase tracking-wider">Yes</p>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 text-center hover:bg-rose-500/15 transition-colors">
                    <p className="text-rose-400 text-3xl font-bold">{market.noPercentage}%</p>
                    <p className="text-gray-400 text-sm mt-1 uppercase tracking-wider">No</p>
                  </div>
                </div>

                {/* Bet Amount Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">
                    Amount (SOL)
                  </label>
                  <input
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    className="w-full bg-[#16161f] border border-[#1f1f28] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/50 opacity-50 cursor-not-allowed transition-colors"
                    placeholder="0.00"
                    disabled
                  />
                </div>

                {/* Bet Buttons - Greyed Out */}
                <div className="space-y-3">
                  <button
                    disabled
                    className="w-full bg-emerald-600/10 text-emerald-400/40 border border-emerald-500/20 rounded-xl px-4 py-3 font-semibold cursor-not-allowed"
                  >
                    Bet Yes
                  </button>
                  <button
                    disabled
                    className="w-full bg-rose-600/10 text-rose-400/40 border border-rose-500/20 rounded-xl px-4 py-3 font-semibold cursor-not-allowed"
                  >
                    Bet No
                  </button>
                </div>

                {/* Awaiting Liquidity Message */}
                <div className="mt-6 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
                  <p className="text-yellow-400 text-sm text-center font-medium">
                    ⏳ Awaiting Liquidity
                  </p>
                  <p className="text-gray-500 text-xs text-center mt-1">
                    Betting will be enabled once liquidity is added
                  </p>
                </div>

                {!connected && (
                  <div className="mt-4 p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-xl">
                    <p className="text-indigo-400 text-sm text-center font-medium">
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
