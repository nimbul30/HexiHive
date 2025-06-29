// src/app/onboarding/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// --- 1. IMPORT THE TOOLS WE NEED ---
import { useAuthContext } from '@/context/AuthContext';
import { db } from '@/lib/firebase/config';
import { doc, updateDoc } from 'firebase/firestore';

export default function OnboardingPage() {
  const router = useRouter();
  // --- 2. GET THE CURRENT USER ---
  const { user } = useAuthContext();
  const [isSkipping, setIsSkipping] = useState(false);

  // --- 3. CREATE THE UPDATED HANDLE-SKIP FUNCTION ---
  const handleSkip = async () => {
    // If we don't have a user, do nothing.
    if (!user) return;

    setIsSkipping(true);

    // Create a reference to the user's document
    const userDocRef = doc(db, 'users', user.uid);

    try {
      // Update the 'hasCompletedOnboarding' field to true
      await updateDoc(userDocRef, {
        hasCompletedOnboarding: true,
      });

      // Now that the database is updated, redirect to the dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Error updating document:', error);
      // Optionally, show an error message to the user
      setIsSkipping(false);
    }
  };

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
          <button className="flex items-center justify-center w-full bg-[#1DB954] hover:bg-[#1ED760] text-white font-bold py-4 px-6 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg">
            Connect Spotify 🎧
          </button>
          <button className="flex items-center justify-center w-full bg-[#FF0000] hover:bg-[#CC0000] text-white font-bold py-4 px-6 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg">
            Connect YouTube 🎥
          </button>
          <button className="flex items-center justify-center w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:opacity-90 text-white font-bold py-4 px-6 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg">
            Add Instagram / Twitter 📷
          </button>
        </div>

        <div className="mt-8">
          {/* --- 4. UPDATE THE BUTTON'S ONCLICK HANDLER AND STATE --- */}
          <button
            onClick={handleSkip}
            disabled={isSkipping}
            className="text-gray-400 hover:text-white hover:underline transition-colors disabled:text-gray-600 disabled:cursor-not-allowed"
          >
            {isSkipping ? 'Saving...' : 'Skip for now'}
          </button>
        </div>
      </div>
    </div>
  );
}
