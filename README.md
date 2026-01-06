# Anime Market

A prediction market platform for anime and manga enthusiasts. Bet on anime releases, manga chapter predictions, and industry events.

## Features

- **Solana Wallet Integration**: Connect with Phantom wallet
- **Create Markets**: Users can submit new prediction markets (requires wallet connection)
- **Admin Panel**: Approve markets and set odds at `/admin`
- **Dark Theme**: Polymarket-inspired design
- **Market Categories**: Anime releases, manga chapters, awards, and industry events

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Phantom wallet (for testing)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/readease1/anime-market.git
cd anime-market
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Admin Access

- Navigate to `/admin`
- Default password: `admin123`
- Approve markets and set odds

## Deploying to Vercel

1. Push your code to GitHub (already done!)

2. Go to [vercel.com](https://vercel.com)

3. Click "Add New Project"

4. Import your `anime-market` repository

5. Vercel will automatically detect Next.js and configure:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

6. Click "Deploy"

7. Your site will be live at `https://your-project-name.vercel.app`

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Solana Web3.js
- **Wallet**: Solana Wallet Adapter (Phantom)

## Project Structure

```
anime-market/
├── app/
│   ├── admin/           # Admin panel
│   ├── market/[id]/     # Individual market pages
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Homepage
├── components/
│   ├── CreateMarketModal.tsx
│   ├── MarketCard.tsx
│   ├── WalletButton.tsx
│   └── WalletProvider.tsx
├── types/
│   └── index.ts         # TypeScript interfaces
└── ...config files
```

## Environment Variables

Currently no environment variables needed. Markets are stored in browser localStorage (for demo purposes).

## Future Enhancements

- Backend integration for persistent storage
- Real Solana smart contracts for betting
- User profiles and bet history
- Market resolution system
- Real-time odds updates
- Social features (comments, sharing)

## License

ISC
