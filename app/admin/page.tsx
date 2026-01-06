'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import WalletButton from '@/components/WalletButton';
import { Market } from '@/types';

const ADMIN_PASSWORD = 'admin123'; // Simple password protection

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [markets, setMarkets] = useState<Market[]>([]);
  const [editingMarket, setEditingMarket] = useState<string | null>(null);
  const [tempYes, setTempYes] = useState<number>(50);

  useEffect(() => {
    if (isAuthenticated) {
      loadMarkets();
    }
  }, [isAuthenticated]);

  const loadMarkets = () => {
    const stored = localStorage.getItem('markets');
    if (stored) {
      setMarkets(JSON.parse(stored));
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleApprove = (marketId: string) => {
    const updated = markets.map(m =>
      m.id === marketId ? { ...m, status: 'active' as const } : m
    );
    setMarkets(updated);
    localStorage.setItem('markets', JSON.stringify(updated));
  };

  const handleReject = (marketId: string) => {
    const updated = markets.filter(m => m.id !== marketId);
    setMarkets(updated);
    localStorage.setItem('markets', JSON.stringify(updated));
  };

  const handleUpdateOdds = (marketId: string) => {
    const updated = markets.map(m =>
      m.id === marketId ? { ...m, yesPercentage: tempYes, noPercentage: 100 - tempYes } : m
    );
    setMarkets(updated);
    localStorage.setItem('markets', JSON.stringify(updated));
    setEditingMarket(null);
  };

  const startEditing = (market: Market) => {
    setEditingMarket(market.id);
    setTempYes(market.yesPercentage);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                placeholder="Enter admin password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 font-medium transition-colors"
            >
              Login
            </button>
          </form>
          <button
            onClick={() => router.push('/')}
            className="w-full mt-4 text-gray-400 hover:text-white text-sm"
          >
            ← Back to homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => router.push('/')}
                className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
              >
                ← Anime Market
              </button>
              <p className="text-gray-400 text-sm">Admin Panel</p>
            </div>
            <WalletButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Manage Markets</h2>
          <p className="text-gray-400">Approve markets and set odds</p>
        </div>

        {markets.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No pending markets</p>
          </div>
        ) : (
          <div className="space-y-6">
            {markets.map((market) => (
              <div
                key={market.id}
                className="bg-gray-900/50 border border-gray-800 rounded-lg p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{market.title}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          market.status === 'pending'
                            ? 'bg-yellow-500/20 text-yellow-500'
                            : 'bg-green-500/20 text-green-500'
                        }`}
                      >
                        {market.status}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-2">{market.description}</p>
                    <p className="text-sm text-gray-500">
                      Created by: {market.createdBy.slice(0, 8)}...{market.createdBy.slice(-4)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Category: {market.category.replace('-', ' ')}
                    </p>
                  </div>

                  {market.imageUrl && (
                    <img
                      src={market.imageUrl}
                      alt={market.title}
                      className="w-32 h-32 object-cover rounded-lg ml-4"
                    />
                  )}
                </div>

                {/* Odds Control */}
                <div className="mb-4 p-4 bg-gray-800/50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-400 mb-3">Set Odds</h4>
                  {editingMarket === market.id ? (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">
                          Yes Percentage: {tempYes}%
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="99"
                          value={tempYes}
                          onChange={(e) => setTempYes(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-green-500/10 border border-green-500/30 rounded p-3 text-center">
                          <p className="text-green-400 text-2xl font-bold">{tempYes}%</p>
                          <p className="text-gray-400 text-xs">Yes</p>
                        </div>
                        <div className="bg-red-500/10 border border-red-500/30 rounded p-3 text-center">
                          <p className="text-red-400 text-2xl font-bold">{100 - tempYes}%</p>
                          <p className="text-gray-400 text-xs">No</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdateOdds(market.id)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 text-sm font-medium"
                        >
                          Save Odds
                        </button>
                        <button
                          onClick={() => setEditingMarket(null)}
                          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white rounded px-4 py-2 text-sm font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="bg-green-500/10 border border-green-500/30 rounded p-3 text-center">
                          <p className="text-green-400 text-2xl font-bold">{market.yesPercentage}%</p>
                          <p className="text-gray-400 text-xs">Yes</p>
                        </div>
                        <div className="bg-red-500/10 border border-red-500/30 rounded p-3 text-center">
                          <p className="text-red-400 text-2xl font-bold">{market.noPercentage}%</p>
                          <p className="text-gray-400 text-xs">No</p>
                        </div>
                      </div>
                      <button
                        onClick={() => startEditing(market)}
                        className="w-full bg-gray-700 hover:bg-gray-600 text-white rounded px-4 py-2 text-sm font-medium"
                      >
                        Edit Odds
                      </button>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {market.status === 'pending' && (
                    <button
                      onClick={() => handleApprove(market.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2 font-medium transition-colors"
                    >
                      Approve Market
                    </button>
                  )}
                  <button
                    onClick={() => handleReject(market.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2 font-medium transition-colors"
                  >
                    Delete Market
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
