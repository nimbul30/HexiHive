// src/context/AuthContext.js

'use client';
import { onAuthStateChanged } from 'firebase/auth'; // No longer need getAuth
import { useContext, createContext, useState, useEffect } from 'react';
import { auth } from '@/lib/firebase/config'; // Import the singleton auth instance

// const auth = getAuth(firebase_app); // This line is removed

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // The imported `auth` instance is used here
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? (
        <div className="text-white text-center mt-12">Loading...</div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
