// src/components/Header.js

'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation'; // Import usePathname
import { useAuthContext } from '@/context/AuthContext';
import { auth } from '@/lib/firebase/config';
import { signOut } from 'firebase/auth';

export default function Header() {
  const { user } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname(); // Hook to get the current URL path

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Define our navigation links in an array for cleaner mapping
  const navLinks = [
    { name: 'Hexi Studio', href: '/studio' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'YourHive', href: '/yourhive' }, // Private
    { name: 'Inner Hive', href: '/innerhive' }, // Friends/Family
    { name: 'HiveVerse', href: '/hiveverse' }, // Public
  ];

  return (
    <header className="w-full bg-black/20 backdrop-blur-md p-4 border-b border-gray-700/50 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Section 1: Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center space-x-3">
            <img
              src="https://i.imgur.com/MOtNKI0.png" // New logo
              alt="HexiHive Logo"
              className="h-32 w-auto" // Match the new header's logo style
            />
          </Link>
        </div>

        {/* Section 2: Navigation Links (Only shown if user is logged in) */}
        {user && (
          <nav className="hidden md:flex gap-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-lg font-medium transition-colors duration-200 ${
                  pathname === link.href
                    ? 'text-white' // Active link style
                    : 'text-gray-400 hover:text-white' // Inactive link style
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        )}

        {/* Section 3: User Actions (Login or Logout/Avatar) */}
        <div className="flex items-center gap-x-4">
          {user ? (
            // If user is logged in, show Avatar and Logout button
            <>
              <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center border-2 border-gray-600">
                <span className="text-xl font-bold">
                  {user.email ? user.email[0].toUpperCase() : '?'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors" // Red and smaller
              >
                Logout
              </button>
            </>
          ) : (
            // If no user, show the original Login button
            <Link href="/login">
              <button className="bg-red-600 hover:bg-red-500 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
