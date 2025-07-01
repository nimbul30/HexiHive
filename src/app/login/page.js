// src/app/login/page.js

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase/config';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [actionType, setActionType] = useState('');
  const router = useRouter();

  const handleAuthAction = async (e, action) => {
    e.preventDefault();
    setIsLoading(true);
    setActionType(action);
    setError(null);

    if (!email || !password) {
      setError('Please enter both email and password.');
      setIsLoading(false);
      return;
    }
    if (action === 'signup' && password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }

    try {
      if (action === 'signup') {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          displayName: '',
          bio: '',
          createdAt: serverTimestamp(),
          hasCompletedOnboarding: false,
        });
        router.push('/onboarding');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/dashboard');
      }
    } catch (err) {
      // Error handling...
      switch (err.code) {
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          setError('Invalid email or password. Please try again.');
          break;
        case 'auth/email-already-in-use':
          setError('This email is already registered. Please log in.');
          break;
        default:
          setError('An unexpected error occurred. Please try again.');
          console.error('Authentication Error:', err);
      }
    } finally {
      setIsLoading(false);
      setActionType('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Updated the main container to match the new branding */}
      <div className="w-full max-w-md glass-panel p-8 md:p-12 rounded-2xl shadow-2xl text-center">
        <header className="mb-8">
          <Link href="/" className="inline-block mb-4">
            {/* --- LOGO UPDATED HERE --- */}
            <img
              src="https://i.imgur.com/MOtNKI0.png"
              alt="HexiHive Logo"
              className="h-24 w-auto mx-auto" // New logo and adjusted size
            />
          </Link>
          <h1 className="text-3xl font-extrabold text-white">Enter the Hive</h1>
        </header>

        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2 text-left"
              >
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-slate-800 text-white pl-12 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gold border border-slate-600"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2 text-left"
              >
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="6+ characters required"
                  required
                  className="w-full bg-slate-800 text-white pl-12 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gold border border-slate-600"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 text-red-400 text-sm p-3 rounded-md border border-red-500/20">
              <FiAlertCircle />
              <span>{error}</span>
            </div>
          )}

          {/* Updated buttons to match new branding */}
          <button
            type="button"
            onClick={(e) => handleAuthAction(e, 'signin')}
            disabled={isLoading}
            className="btn-primary w-full py-3 rounded-lg text-lg"
          >
            {isLoading && actionType === 'signin' ? 'Logging In...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-300 mt-8">
          Don't have an account?{' '}
          <button
            onClick={(e) => handleAuthAction(e, 'signup')}
            disabled={isLoading}
            className="font-semibold text-gold hover:text-gold-light transition-colors disabled:text-gray-500"
          >
            {isLoading && actionType === 'signup'
              ? 'Creating account...'
              : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
}
