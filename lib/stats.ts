export interface SiteStats {
  totalVolume: number;
  activeMarkets: number;
  totalTraders: number;
  lastUpdated: number;
}

const INITIAL_TRADERS = 100;
const TRADER_INCREMENT_INTERVAL = 30000; // 30 seconds

export function getStats(markets: any[]): SiteStats {
  // Get stored stats
  const stored = typeof window !== 'undefined' ? localStorage.getItem('siteStats') : null;
  const stats: SiteStats = stored ? JSON.parse(stored) : {
    totalVolume: 0,
    activeMarkets: 0,
    totalTraders: INITIAL_TRADERS,
    lastUpdated: Date.now(),
  };

  // Calculate real total volume from all markets
  const totalVolume = markets.reduce((sum, market) => sum + (market.volume || 0), 0);

  // Count active markets
  const activeMarkets = markets.filter(m => m.status === 'active').length;

  // Increment traders periodically
  const timeSinceUpdate = Date.now() - stats.lastUpdated;
  const traderIncrements = Math.floor(timeSinceUpdate / TRADER_INCREMENT_INTERVAL);

  const updatedStats: SiteStats = {
    totalVolume,
    activeMarkets,
    totalTraders: stats.totalTraders + traderIncrements,
    lastUpdated: Date.now(),
  };

  // Save to localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('siteStats', JSON.stringify(updatedStats));
  }

  return updatedStats;
}

export function formatVolume(volume: number): string {
  if (volume >= 1000000) return `$${(volume / 1000000).toFixed(2)}M`;
  if (volume >= 1000) return `$${(volume / 1000).toFixed(1)}K`;
  return `$${volume}`;
}

export function formatNumber(num: number): string {
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K+`;
  return `${num}+`;
}
