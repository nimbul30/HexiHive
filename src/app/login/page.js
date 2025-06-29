// src/app/login/page.js

'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Import Link
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi'; // Import icons

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const router = useRouter();

  const handleAuthAction = async (action) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password.');
      setIsLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }

    try {
      if (action === 'signup') {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push('/');
    } catch (err) {
      // Use more user-friendly error messages
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
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Login Card */}
      <div className="w-full max-w-md bg-gray-900/60 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <img
              src="https://i.imgur.com/o0VXmh6.png"
              alt="HexiHive Logo"
              className="w-20 h-20 mx-auto"
            />
          </Link>
          <h1 className="text-3xl font-extrabold text-white">
            Welcome to the Hive
          </h1>
          <p className="text-gray-400 mt-2">
            Sign in or create an account to start building.
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col space-y-5">
          {/* Email Input */}
          <div className="relative">
            <FiMail className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              className="w-full bg-gray-800/70 text-white pl-12 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <FiLock className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full bg-gray-800/70 text-white pl-12 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 text-red-400 text-sm p-3 rounded-md border border-red-500/20">
              <FiAlertCircle />
              <span>{error}</span>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col gap-4 pt-2">
            <button
              onClick={(e) => handleAuthAction(e, 'signin')}
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-500 disabled:bg-red-800 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
            >
              {isLoading ? 'Logging In...' : 'Login'}
            </button>
            <button
              onClick={(e) => handleAuthAction(e, 'signup')}
              disabled={isLoading}
              className="w-full bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300"
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
