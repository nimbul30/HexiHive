// src/app/studio/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import Header from '@/components/Header';

// Import Firestore functions
import { db } from '@/lib/firebase/config';
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';

export default function StudioPage() {
  const { user, loading: authLoading } = useAuthContext();
  const router = useRouter();

  const [hexis, setHexis] = useState([]);
  const [loadingHexis, setLoadingHexis] = useState(true);

  // Effect to protect the route
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // Effect to fetch Hexis from Firestore in real-time
  useEffect(() => {
    if (user) {
      setLoadingHexis(true);
      const hexisRef = collection(db, 'hexis');
      // Create a query to get only the Hexis for the current user
      // that are in the 'studio'
      const q = query(
        hexisRef,
        where('uid', '==', user.uid),
        where('status', '==', 'studio')
      );

      // onSnapshot listens for real-time updates
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const hexisData = [];
        querySnapshot.forEach((doc) => {
          hexisData.push({ id: doc.id, ...doc.data() });
        });
        setHexis(hexisData);
        setLoadingHexis(false);
      });

      // Cleanup subscription on component unmount
      return () => unsubscribe();
    }
  }, [user]);

  // Function to create a new, simple Text Hexi
  const createNewHexi = async () => {
    if (!user) return;

    try {
      await addDoc(collection(db, 'hexis'), {
        uid: user.uid,
        type: 'text',
        content: { text: 'New Hexi - Click to edit!' },
        status: 'studio',
        assignedHive: 'yourhive', // Default to private
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error creating new hexi: ', error);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="container mx-auto p-8 text-white">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold">Hexi Studio</h1>
          <button
            onClick={createNewHexi}
            className="btn-primary py-2 px-6 rounded-lg transition-all duration-500"
          >
            + Create New Hexi
          </button>
        </div>

        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
          <h2 className="text-2xl font-bold mb-4">Your Drafts</h2>
          {loadingHexis ? (
            <p>Loading your hexis...</p>
          ) : hexis.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hexis.map((hexi) => (
                <div key={hexi.id} className="bg-gray-900 p-4 rounded-lg">
                  <p>Type: {hexi.type}</p>
                  <p>Content: "{hexi.content.text}"</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Hive: {hexi.assignedHive}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">
              You have no drafts. Click "Create New Hexi" to get started!
            </p>
          )}
        </div>
      </main>
    </>
  );
}
