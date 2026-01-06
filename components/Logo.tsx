export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        {/* Animated rings */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 blur-xl animate-pulse"></div>

        {/* Logo icon */}
        <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/50">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-6 h-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"
              fill="currentColor"
              className="drop-shadow-lg"
            />
          </svg>
        </div>
      </div>

      {/* Brand name */}
      <div className="flex flex-col">
        <span className="text-xl font-bold tracking-tight gradient-text">
          Anime Market
        </span>
        <span className="text-[10px] text-gray-500 uppercase tracking-wider font-medium -mt-1">
          Prediction Markets
        </span>
      </div>
    </div>
  );
}
