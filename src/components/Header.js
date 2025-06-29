// src/components/Header.js

'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import { auth } from '@/lib/firebase/config';
import { signOut } from 'firebase/auth';

export default function Header() {
  const { user } = useAuthContext();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-10 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3">
          <img
            src="https://i.imgur.com/o0VXmh6.png"
            alt="HexiHive Logo"
            className="w-16 h-16"
          />
        </Link>
        <nav>
          {user ? (
            <div className="flex items-center gap-4">
              <p className="text-gray-300 text-sm">Signed in as {user.email}</p>
              <button
                onClick={handleLogout}
                className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login">
              <button className="bg-red-600 hover:bg-red-500 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                Login
              </button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
