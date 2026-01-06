export interface Market {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  category: 'anime-release' | 'manga-chapter' | 'awards' | 'industry';
  status: 'pending' | 'active' | 'resolved';
  yesPercentage: number;
  noPercentage: number;
  volume: number;
  createdBy: string;
  createdAt: Date;
  resolvedAt?: Date;
  endDate: Date;
}

export interface Bet {
  id: string;
  marketId: string;
  userId: string;
  amount: number;
  position: 'yes' | 'no';
  createdAt: Date;
}
