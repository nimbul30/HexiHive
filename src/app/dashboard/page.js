// src/app/dashboard/page.js

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import Header from '@/components/Header';
import { db } from '@/lib/firebase/config';
import { doc, getDoc } from 'firebase/firestore';

export default function DashboardPage() {
  // --- 1. GET THE LOADING STATE FROM THE CONTEXT ---
  const { user, loading: authLoading } = useAuthContext();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    // --- 2. THE CRITICAL LOGIC CHANGE ---
    // Only run this logic when the auth state is no longer loading
    if (!authLoading) {
      if (user == null) {
        // If auth is done and we still have no user, redirect to login
        router.push('/login');
        return;
      }

      // We have a user, now check their profile from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      getDoc(userDocRef).then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (!data.hasCompletedOnboarding) {
            router.push('/onboarding');
          } else {
            setProfile(data);
            setLoadingProfile(false);
          }
        } else {
          console.error('User document does not exist!');
          setLoadingProfile(false);
        }
      });
    }
  }, [user, authLoading, router]); // Dependency array now includes authLoading

  // --- 3. COMBINE LOADING STATES ---
  // Show loading if either the auth check or profile fetch is in progress
  if (authLoading || loadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  // Render the dashboard only if loading is false and we have a profile
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
        </div>
      </main>
    </>
  );
}
