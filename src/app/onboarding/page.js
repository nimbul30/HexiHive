// src/app/onboarding/page.js

'use client';

// --- 1. ONLY IMPORT from next-auth/react ---
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // This function is for our "Finish" button later
  const handleFinishOnboarding = () => {
    // In a real scenario, we'd update the Firebase doc here
    // before redirecting.
    console.log('Onboarding complete, redirecting to dashboard...');
    router.push('/dashboard');
  };

  // --- 2. HANDLE THE LOADING STATE ---
  // Status can be 'loading', 'authenticated', or 'unauthenticated'
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading Session...
      </div>
    );
  }

  // --- 3. IF THE USER IS AUTHENTICATED WITH SPOTIFY, SHOW THEIR DATA ---
  if (status === 'authenticated') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-white">
        <div className="w-full max-w-lg bg-gray-900/50 p-8 rounded-2xl text-center">
          <h1 className="text-3xl font-bold mb-4">Connection Successful!</h1>
          <p className="mb-2">You are connected as:</p>
          <p className="text-lg font-bold text-green-400 mb-6">
            {session.user.name} ({session.user.email})
          </p>
          <pre className="text-left bg-gray-800 p-4 rounded-md overflow-x-auto text-xs">
            <code>{JSON.stringify(session, null, 2)}</code>
          </pre>
          <button
            onClick={handleFinishOnboarding}
            className="w-full mt-6 bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-lg"
          >
            Finish Onboarding
          </button>
        </div>
      </div>
    );
  }

  // --- 4. IF NOT AUTHENTICATED, SHOW THE CONNECT BUTTON ---
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg bg-gray-900/50 backdrop-blur-xl p-8 md:p-12 rounded-2xl shadow-2xl text-center border border-gray-700">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-white mb-2">
            Build your Hive
          </h1>
          <p className="text-lg text-gray-300">
            Connect your Spotify account to get started.
          </p>
        </header>
        <button
          onClick={() => signIn('spotify')}
          className="flex items-center justify-center w-full bg-[#1DB954] hover:bg-[#1ED760] text-white font-bold py-4 px-6 rounded-lg text-lg"
        >
          Connect Spotify 🎧
        </button>
      </div>
    </div>
  );
}
