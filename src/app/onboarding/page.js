// src/app/onboarding/page.js
'use client';

import { useRouter } from 'next/navigation';

// This is a placeholder for the function we'll write later
// to mark onboarding as complete.
const handleSkip = (router) => {
  // In the future, this will set 'hasCompletedOnboarding' to true
  // For now, it just navigates to the dashboard.
  console.log('Skipping onboarding for now...');
  router.push('/dashboard');
};

export default function OnboardingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg bg-gray-900/50 backdrop-blur-xl p-8 md:p-12 rounded-2xl shadow-2xl text-center border border-gray-700">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
            Build your Hive in seconds.
          </h1>
          <p className="text-lg text-gray-300">
            Let us help build your Hive — connect your music & socials. Fast,
            fun, zero effort.
          </p>
        </header>

        <div className="flex flex-col space-y-4">
          {/* We will add onClick handlers to these buttons later for OAuth */}
          <button className="flex items-center justify-center w-full bg-[#1DB954] hover:bg-[#1ED760] text-white font-bold py-4 px-6 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg">
            {/* Spotify SVG */}
            Connect Spotify 🎧
          </button>

          <button className="flex items-center justify-center w-full bg-[#FF0000] hover:bg-[#CC0000] text-white font-bold py-4 px-6 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg">
            {/* YouTube SVG */}
            Connect YouTube 🎥
          </button>

          <button className="flex items-center justify-center w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:opacity-90 text-white font-bold py-4 px-6 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg">
            {/* Instagram SVG */}
            Add Instagram / Twitter 📷
          </button>
        </div>

        <div className="mt-8">
          <button
            onClick={() => handleSkip(router)}
            className="text-gray-400 hover:text-white hover:underline transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
