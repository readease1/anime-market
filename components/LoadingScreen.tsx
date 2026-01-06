'use client';

import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onEnter: () => void;
}

export default function LoadingScreen({ onEnter }: LoadingScreenProps) {
  const [displayText, setDisplayText] = useState('');
  const targetText = 'animemarkets.fun';
  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';

  useEffect(() => {
    let currentIndex = 0;
    let glitchInterval: NodeJS.Timeout;

    const animateText = () => {
      if (currentIndex <= targetText.length) {
        // Glitch effect
        glitchInterval = setInterval(() => {
          const glitched = targetText
            .split('')
            .map((char, i) => {
              if (i < currentIndex) return char;
              if (i === currentIndex) {
                return Math.random() > 0.5 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char;
              }
              return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            })
            .join('');
          setDisplayText(glitched);
        }, 30);

        setTimeout(() => {
          clearInterval(glitchInterval);
          setDisplayText(targetText.slice(0, currentIndex + 1));
          currentIndex++;
          if (currentIndex <= targetText.length) {
            setTimeout(animateText, 50);
          }
        }, 80);
      }
    };

    setTimeout(animateText, 300);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden">
      {/* Animated Background - Full Screen GIF */}
      <div className="absolute inset-0">
        <img
          src="https://cdn.prod.website-files.com/69082c5061a39922df8ed3b6/695d1596da585e682dac44b5_landingbg%20(1).gif"
          alt="Background"
          className="w-full h-full object-cover opacity-50"
          style={{
            minWidth: '100%',
            minHeight: '100%',
          }}
        />
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* Glitchy animated text */}
        <div className="mb-12">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-2 font-mono tracking-wider"
            style={{
              textShadow: '0 0 20px rgba(99, 102, 241, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)',
              animation: 'glitch 0.3s infinite'
            }}
          >
            {displayText}
            <span className="animate-pulse">_</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base tracking-widest uppercase">
            Prediction Markets • Anime & Manga
          </p>
        </div>

        {/* Enter button */}
        <button
          onClick={onEnter}
          className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/50"
        >
          <span className="relative z-10 flex items-center gap-2">
            Enter Site
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>

        {/* Scanning effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-30"
            style={{
              animation: 'scan 3s linear infinite',
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes glitch {
          0%, 100% {
            text-shadow: 0 0 20px rgba(99, 102, 241, 0.5), 0 0 40px rgba(139, 92, 246, 0.3);
          }
          25% {
            text-shadow: -2px 0 20px rgba(239, 68, 68, 0.5), 2px 0 40px rgba(16, 185, 129, 0.3);
          }
          50% {
            text-shadow: 2px 0 20px rgba(16, 185, 129, 0.5), -2px 0 40px rgba(239, 68, 68, 0.3);
          }
          75% {
            text-shadow: 0 2px 20px rgba(236, 72, 153, 0.5), 0 -2px 40px rgba(99, 102, 241, 0.3);
          }
        }

        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </div>
  );
}
