// src/components/Header.js

'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import { auth } from '@/lib/firebase/config';
import { signOut } from 'firebase/auth';

export default function Header() {
  const { user } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navLinks = [
    { name: 'Hexi Studio', href: '/studio' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'YourHive', href: '/yourhive' },
    { name: 'Inner Hive', href: '/innerhive' },
    { name: 'HiveVerse', href: '/hiveverse' },
  ];

  return (
    // The main container remains a sticky header
    <header className="w-full bg-black/20 backdrop-blur-md p-4 border-b border-gray-700/50 sticky top-0 z-50">
      {/* This flex container pushes the two main groups apart */}
      <div className="container mx-auto flex justify-between items-center">
        {/* Group 1: Logo (Stays on the far left) */}
        <div className="flex-shrink-0">
          <Link href="/">
            <img
              src="https://i.imgur.com/MOtNKI0.png"
              alt="HexiHive Logo"
              className="h-32 w-auto" // Using the new logo and style
            />
          </Link>
        </div>

        {/* Group 2: All Nav and User Actions (Pushed to the far right) */}
        <div className="flex items-center gap-x-8">
          {user ? (
            // If logged in, show the full navigation suite
            <>
              <nav className="hidden md:flex gap-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-lg font-medium transition-colors duration-200 ${
                      pathname === link.href
                        ? 'text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              {/* User actions are now inside the same right-aligned group */}
              <div className="flex items-center gap-x-4">
                {/* Logout Button (Now first, with new style) */}
                <button
                  onClick={handleLogout}
                  className="btn-primary py-2 px-4 rounded-md text-sm" // New .btn-primary style
                >
                  Logout
                </button>
                {/* Avatar (Now second) */}
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center border-2 border-gray-600">
                  <span className="text-xl font-bold">
                    {user.email ? user.email[0].toUpperCase() : '?'}
                  </span>
                </div>
              </div>
            </>
          ) : (
            // If not logged in, show a simple login button
            <Link
              href="/login"
              className="btn-primary py-2 px-8 rounded-md text-sm"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
