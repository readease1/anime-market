'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

interface CreateMarketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateMarketModal({ isOpen, onClose }: CreateMarketModalProps) {
  const { publicKey } = useWallet();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'anime-release' | 'manga-chapter' | 'awards' | 'industry'>('anime-release');
  const [imageUrl, setImageUrl] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newMarket = {
      title,
      description,
      category,
      imageUrl: imageUrl || '/placeholder-anime.jpg',
      createdBy: publicKey?.toBase58() || 'anonymous',
      endDate: new Date(endDate),
      status: 'pending',
      yesPercentage: 50,
      noPercentage: 50,
      volume: 0,
    };

    // Store in localStorage for now (will be replaced with backend)
    const markets = JSON.parse(localStorage.getItem('markets') || '[]');
    markets.push({ ...newMarket, id: Date.now().toString(), createdAt: new Date() });
    localStorage.setItem('markets', JSON.stringify(markets));

    // Reset form
    setTitle('');
    setDescription('');
    setImageUrl('');
    setEndDate('');
    onClose();
    window.location.reload(); // Refresh to show new market
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Create Market</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Market Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              placeholder="Will One Piece get a live action Season 2?"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 h-24"
              placeholder="Provide details about the market resolution criteria..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="anime-release">Anime Release</option>
              <option value="manga-chapter">Manga Chapter</option>
              <option value="awards">Awards</option>
              <option value="industry">Industry Events</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Image URL (optional)
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white rounded-lg px-4 py-2 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 font-medium transition-colors"
            >
              Create Market
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
