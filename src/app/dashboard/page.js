// src/app/dashboard/page.js

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import Header from '@/components/Header';

// --- 1. IMPORT FIRESTORE FUNCTIONS ---
import { db } from '@/lib/firebase/config';
import { doc, getDoc } from 'firebase/firestore';

export default function DashboardPage() {
  const { user } = useAuthContext();
  const router = useRouter();

  // --- 2. ADD STATE FOR PROFILE DATA ---
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // This effect handles authentication redirection
  useEffect(() => {
    if (user == null) {
      router.push('/login');
    }
  }, [user, router]);

  // --- 3. ADD EFFECT TO FETCH PROFILE DATA ---
  useEffect(() => {
    // Only fetch if we have a user object
    if (user) {
      const fetchProfile = async () => {
        // Create a reference to the user's document in the 'users' collection
        const userDocRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          // If the document exists, set the profile state with its data
          setProfile(docSnap.data());
        } else {
          // Handle case where profile doc might not exist (optional)
          console.log('No such profile document!');
        }
        setLoadingProfile(false);
      };

      fetchProfile();
    }
  }, [user]); // This effect depends on the user object

  // Main loading state before we know if user is logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  // If the user is logged in, show the dashboard content
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center text-white">
        <div className="max-w-2xl bg-gray-800/50 p-8 rounded-xl shadow-lg border border-gray-700">
          <h1 className="text-5xl font-extrabold tracking-tight text-white mb-4">
            Dashboard
          </h1>

          {/* --- 4. RENDER THE PROFILE DATA --- */}
          {loadingProfile ? (
            <p>Loading profile...</p>
          ) : profile ? (
            <div>
              <p className="text-xl text-gray-300 mb-2">
                Welcome,{' '}
                <span className="font-bold text-red-400">
                  {/* If displayName is empty, show the email */}
                  {profile.displayName || profile.email}
                </span>
              </p>
              <p className="text-lg text-gray-400">
                Bio: {profile.bio || <i>No bio set.</i>}
              </p>
            </div>
          ) : (
            <p>Could not load profile.</p>
          )}

          <p className="mt-8 text-sm text-gray-500">User ID: {user.uid}</p>
        </div>
      </main>
    </>
  );
}
