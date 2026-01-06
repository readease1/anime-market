import Link from 'next/link';
import { Market } from '@/types';

interface MarketCardProps {
  market: Market;
}

export default function MarketCard({ market }: MarketCardProps) {
  const formatVolume = (volume: number) => {
    if (volume >= 1000) return `$${(volume / 1000).toFixed(1)}K`;
    return `$${volume}`;
  };

  return (
    <Link href={`/market/${market.id}`}>
      <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg overflow-hidden hover:border-gray-600 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer group">
        {market.imageUrl && (
          <div className="aspect-video w-full overflow-hidden bg-gray-900">
            <img
              src={market.imageUrl}
              alt={market.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>
        )}

        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-white pr-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
              {market.title}
            </h3>
          </div>

          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {market.description}
          </p>

          {market.status === 'pending' && (
            <div className="mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-yellow-500 text-xs font-medium">Awaiting Aggregation & Liquidity</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-gray-700">
            <div className="flex items-center gap-3">
              <div className={`text-2xl font-bold ${market.yesPercentage > 50 ? 'text-green-400' : 'text-red-400'}`}>
                {market.yesPercentage}%
              </div>
              <span className="text-gray-500 text-sm">Yes</span>
            </div>
            <div className="text-sm text-gray-500">
              {formatVolume(market.volume)} Vol
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
