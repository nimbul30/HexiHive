// src/app/onboarding/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import { getTopArtists } from '@/lib/spotify';
import { getMySubscriptions } from '@/lib/youtube';
import { useAuthContext } from '@/context/AuthContext';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { user } = useAuthContext();

  // State for the multi-step flow
  const [step, setStep] = useState(1); // 1: Connect, 2: Profile, 3: Finish

  // State for imported data
  const [topArtists, setTopArtists] = useState(null);
  const [subscriptions, setSubscriptions] = useState(null);
  const [loading, setLoading] = useState(false);

  // State for profile form
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');

  // Effect to fetch data after connection
  useEffect(() => {
    if (status === 'authenticated' && session && step === 1) {
      setLoading(true);
      if (session.provider === 'spotify') {
        getTopArtists(session).then((data) => {
          if (data && data.items) setTopArtists(data.items);
          setLoading(false);
          setStep(2); // Move to profile step
        });
      } else if (session.provider === 'google') {
        getMySubscriptions(session).then((data) => {
          if (data && data.items) setSubscriptions(data.items);
          setLoading(false);
          setStep(2); // Move to profile step
        });
      }
    }
  }, [status, session, step]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      console.error('User not found.');
      return;
    }
    const userDocRef = doc(db, 'users', user.uid);
    try {
      const profileData = {
        displayName: displayName,
        bio: bio,
        hasCompletedOnboarding: true,
        onboardingCompletedAt: serverTimestamp(),
      };

      if (topArtists) {
        profileData.spotifyTopArtists = topArtists.map((artist) => ({
          id: artist.id,
          name: artist.name,
          image: artist.images[2]?.url || null,
        }));
      }

      if (subscriptions) {
        profileData.youtubeSubscriptions = subscriptions.map((sub) => ({
          id: sub.snippet.resourceId.channelId,
          name: sub.snippet.title,
          image: sub.snippet.thumbnails.default.url,
        }));
      }

      await updateDoc(userDocRef, profileData);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error updating user document:', error);
    }
  };

  const renderStepContent = () => {
    // Step 1: Connect Socials
    if (step === 1) {
      return (
        <>
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
              Build your Hive in seconds.
            </h1>
            <p className="text-lg text-gray-300">
              Let's start by connecting to your Spotify or YouTube.
            </p>
          </header>
          {loading ? (
            <p>Loading your vibe...</p>
          ) : (
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
          )}
        </>
      );
    }

    // Step 2: Set Up Profile
    if (step === 2) {
      return (
        <>
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
              Create Your Profile
            </h1>
            <p className="text-lg text-gray-300">
              This is how other users will see you in the Hive.
            </p>
          </header>
          <form
            onSubmit={handleProfileSubmit}
            className="w-full text-left flex flex-col gap-6"
          >
            <div>
              <label
                htmlFor="displayName"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Display Name
              </label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your public name"
                required
                className="w-full bg-slate-800 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gold border border-slate-600"
              />
            </div>
            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Short Bio
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell everyone a little about your vibe (optional)"
                rows="3"
                className="w-full bg-slate-800 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gold border border-slate-600"
              />
            </div>
            <button
              type="submit"
              className="w-full btn-primary py-3 px-6 rounded-lg text-lg"
            >
              Finish and Enter the Hive
            </button>
          </form>
        </>
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg bg-gray-900/50 backdrop-blur-xl p-8 md:p-12 rounded-2xl shadow-2xl flex flex-col items-center border border-gray-700">
        {renderStepContent()}
      </div>
    </div>
  );
}
