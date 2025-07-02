// src/app/onboarding/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import { getTopArtists } from '@/lib/spotify';
import { getMySubscriptions } from '@/lib/youtube';
import { useAuthContext } from '@/context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { user } = useAuthContext();

  const [topArtists, setTopArtists] = useState(null);
  const [subscriptions, setSubscriptions] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === 'authenticated' && session) {
      setLoading(true);
      if (session.provider === 'spotify') {
        getTopArtists(session).then((data) => {
          if (data && data.items) {
            setTopArtists(data.items);
          }
          setLoading(false);
        });
      } else if (session.provider === 'google') {
        getMySubscriptions(session).then((data) => {
          if (data && data.items) {
            setSubscriptions(data.items);
          }
          setLoading(false);
        });
      }
    }
  }, [status, session]);

  const handleFinishOnboarding = async () => {
    if (!user) {
      console.error('User not found.');
      return;
    }
    const userDocRef = doc(db, 'users', user.uid);
    try {
      await updateDoc(userDocRef, {
        hasCompletedOnboarding: true,
      });
      router.push('/dashboard');
    } catch (error) {
      console.error('Error updating user document:', error);
    }
  };

  const renderContent = () => {
    if (loading) {
      return <p>Loading your vibe...</p>;
    }

    if (topArtists) {
      return (
        <div className="text-left w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Here are your top artists!
          </h2>
          <ul className="space-y-3">
            {topArtists.map((artist) => (
              <li
                key={artist.id}
                className="flex items-center bg-gray-800/70 p-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <img
                  src={artist.images[2]?.url || '/default-artist.png'}
                  alt={artist.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <span className="font-semibold">{artist.name}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={handleFinishOnboarding}
            className="w-full mt-6 btn-primary py-3 px-6 rounded-lg text-lg"
          >
            Use These to Build My Hive
          </button>
        </div>
      );
    }

    if (subscriptions) {
      return (
        <div className="text-left w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Here are your YouTube subscriptions!
          </h2>
          <ul className="space-y-3">
            {subscriptions.map((sub) => (
              <li
                key={sub.id}
                className="flex items-center bg-gray-800/70 p-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <img
                  src={sub.snippet.thumbnails.default.url}
                  alt={sub.snippet.title}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <span className="font-semibold">{sub.snippet.title}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={handleFinishOnboarding}
            className="w-full mt-6 btn-primary py-3 px-6 rounded-lg text-lg"
          >
            Use These to Build My Hive
          </button>
        </div>
      );
    }

    return (
      <div className="flex flex-col space-y-4 w-full">
        <button
          onClick={() => signIn('spotify')}
          className="flex items-center justify-center w-full bg-[#1DB954] hover:bg-[#1ED760] text-white font-bold py-4 px-6 rounded-lg text-lg"
        >
          Connect Spotify 🎧
        </button>
        <button
          onClick={() => signIn('google')}
          className="flex items-center justify-center w-full bg-[#FF0000] hover:bg-[#ff4c4c] text-white font-bold py-4 px-6 rounded-lg text-lg"
        >
          Connect YouTube 📺
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg bg-gray-900/50 backdrop-blur-xl p-8 md:p-12 rounded-2xl shadow-2xl text-center border border-gray-700 flex flex-col items-center">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
            Build your Hive in seconds.
          </h1>
          <p className="text-lg text-gray-300">
            Let's start by connecting to your Spotify or YouTube.
          </p>
        </header>
        {renderContent()}
        <div className="mt-8">
          <button
            onClick={handleFinishOnboarding}
            className="text-gray-400 hover:text-white hover:underline transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
