'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import WalletButton from '@/components/WalletButton';
import CreateMarketModal from '@/components/CreateMarketModal';
import MarketCard from '@/components/MarketCard';
import Logo from '@/components/Logo';
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
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <header className="border-b border-[#1f1f28] bg-[#13131a]/80 backdrop-blur-xl sticky top-0 z-50 shadow-lg shadow-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Logo />

            {/* Navigation & Actions */}
            <div className="flex items-center gap-4">
              {connected && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Market
                </button>
              )}
              <WalletButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 gradient-text leading-tight">
            Anime Prediction Markets
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Bet on anime releases, manga developments, and industry events with real-time odds
          </p>

          {/* Stats Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-400">
                <span className="text-white font-semibold">{markets.length}</span> Active Markets
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span className="text-gray-400">
                <span className="text-white font-semibold">$784K</span> Total Volume
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-gray-400">
                <span className="text-white font-semibold">1.2K+</span> Traders
              </span>
            </div>
          </div>
        </div>

        {/* Markets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {markets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>

        {markets.length === 0 && (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No markets available yet</h3>
              <p className="text-gray-500 mb-6">Be the first to create a prediction market</p>
              {connected && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                >
                  Create the first market
                </button>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Create Market Modal */}
      <CreateMarketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
