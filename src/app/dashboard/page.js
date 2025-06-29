// src/app/dashboard/page.js

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import Header from '@/components/Header';
import { db } from '@/lib/firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function DashboardPage() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If auth context has no user, redirect to login
    if (user == null) {
      router.push('/login');
      return;
    }

    // We have a user, now check their profile from Firestore
    const userDocRef = doc(db, 'users', user.uid);
    getDoc(userDocRef).then((docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        // --- THE REDIRECT LOGIC ---
        if (!data.hasCompletedOnboarding) {
          router.push('/onboarding');
        } else {
          setProfile(data);
          setLoading(false);
        }
      } else {
        // This case shouldn't happen if our signup logic is correct
        console.error('User document does not exist!');
        setLoading(false);
      }
    });
  }, [user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  // Render the dashboard only if loading is false and we have a profile
  // (which implies onboarding was completed)
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col items-center justify-center p-8 text-white">
        <div className="w-full max-w-2xl bg-gray-800/50 p-8 rounded-xl shadow-lg border border-gray-700">
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-6 text-center">
            Your Dashboard
          </h1>
          <p className="text-center">
            Welcome, {profile?.displayName || profile?.email}!
          </p>
          {/* We'll re-add the edit form here later */}
        </div>
      </main>
    </>
  );
}
