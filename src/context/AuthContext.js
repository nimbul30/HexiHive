// src/context/AuthContext.js

'use client';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useContext, createContext, useState, useEffect } from 'react';
import firebase_app from '@/lib/firebase/config';

const auth = getAuth(firebase_app);

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // <-- This state is key

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false); // Set loading to false once we have a response
    });

    return () => unsubscribe();
  }, []);

  // Pass down BOTH the user and the loading state.
  // Remove the ternary here; pages will handle their own loading UI.
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
