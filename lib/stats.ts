export interface SiteStats {
  totalVolume: number;
  activeMarkets: number;
  totalTraders: number;
  lastUpdated: number;
}

const INITIAL_VOLUME = 1400;
const INITIAL_TRADERS = 101;
const TRADER_INCREMENT_INTERVAL = 60000; // 1 minute
const VOLUME_INCREMENT_INTERVAL = 120000; // 2 minutes
const VOLUME_INCREMENT_AMOUNT = 50; // Add $50 every 2 minutes

export function getStats(markets: any[]): SiteStats {
  // Get stored GLOBAL stats (same for all users)
  const stored = typeof window !== 'undefined' ? localStorage.getItem('globalSiteStats') : null;
  const stats: SiteStats = stored ? JSON.parse(stored) : {
    totalVolume: INITIAL_VOLUME,
    activeMarkets: 0,
    totalTraders: INITIAL_TRADERS,
    lastUpdated: Date.now(),
  };

  // Count active markets from actual data
  const activeMarkets = markets.filter(m => m.status === 'active').length;

  // Calculate time-based increments
  const timeSinceUpdate = Date.now() - stats.lastUpdated;
  const traderIncrements = Math.floor(timeSinceUpdate / TRADER_INCREMENT_INTERVAL);
  const volumeIncrements = Math.floor(timeSinceUpdate / VOLUME_INCREMENT_INTERVAL);

  const updatedStats: SiteStats = {
    totalVolume: stats.totalVolume + (volumeIncrements * VOLUME_INCREMENT_AMOUNT),
    activeMarkets,
    totalTraders: stats.totalTraders + traderIncrements,
    lastUpdated: Date.now(),
  };

  // Save to localStorage as GLOBAL stats
  if (typeof window !== 'undefined') {
    localStorage.setItem('globalSiteStats', JSON.stringify(updatedStats));
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
