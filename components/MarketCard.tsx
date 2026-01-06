import Link from 'next/link';
import { Market } from '@/types';

interface MarketCardProps {
  market: Market;
}

export default function MarketCard({ market }: MarketCardProps) {
  const formatVolume = (volume: number) => {
    if (volume >= 1000000) return `$${(volume / 1000000).toFixed(1)}M`;
    if (volume >= 1000) return `$${(volume / 1000).toFixed(1)}K`;
    return `$${volume}`;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'anime-release': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      'manga-chapter': 'bg-pink-500/10 text-pink-400 border-pink-500/20',
      'awards': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      'industry': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    };
    return colors[category as keyof typeof colors] || colors['anime-release'];
  };

  return (
    <Link href={`/market/${market.id}`}>
      <div className="card-shine group relative bg-gradient-to-b from-[#16161f] to-[#13131a] border border-[#1f1f28] rounded-xl overflow-hidden hover:border-indigo-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 cursor-pointer h-full flex flex-col">
        {/* Image Section */}
        {market.imageUrl && (
          <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-gray-900 to-black">
            <img
              src={market.imageUrl}
              alt={market.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#13131a] via-transparent to-transparent opacity-60"></div>

            {/* Category Badge */}
            <div className="absolute top-3 left-3">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md ${getCategoryColor(market.category)}`}>
                {market.category.replace('-', ' ').toUpperCase()}
              </span>
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="text-base font-semibold text-white mb-2 line-clamp-2 group-hover:text-indigo-400 transition-colors leading-snug">
            {market.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed flex-1">
            {market.description}
          </p>

          {/* Status Badge */}
          {market.status === 'pending' && (
            <div className="mb-4 flex items-center gap-2 px-3 py-1.5 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-yellow-500 text-xs font-medium">Awaiting Liquidity</span>
            </div>
          )}

          {/* Odds & Volume */}
          <div className="space-y-3">
            {/* Probability Bars */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 hover:bg-emerald-500/15 transition-colors">
                <div className="text-xs text-emerald-400 font-medium mb-1">YES</div>
                <div className="text-2xl font-bold text-emerald-400 tracking-tight">
                  {market.yesPercentage}%
                </div>
              </div>
              <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-3 hover:bg-rose-500/15 transition-colors">
                <div className="text-xs text-rose-400 font-medium mb-1">NO</div>
                <div className="text-2xl font-bold text-rose-400 tracking-tight">
                  {market.noPercentage}%
                </div>
              </div>
            </div>

            {/* Volume Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-800/50">
              <div className="flex items-center gap-1.5 text-gray-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="text-xs font-medium">Volume</span>
              </div>
              <span className="text-sm font-semibold text-white">
                {formatVolume(market.volume)}
              </span>
            </div>
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </Link>
  );
}
