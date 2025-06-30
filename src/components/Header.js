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
    { name: 'Your Hive', href: '/yourhive' },
    { name: 'Hive Network', href: '/network' },
  ];

  return (
    <header className="w-full bg-black/20 backdrop-blur-md p-4 border-b border-gray-700/50 sticky top-0 z-50">
      <div className="w-full flex justify-between items-center px-8">
        <div className="flex-shrink-0">
          <Link href="/">
            <img
              src="https://i.imgur.com/MOtNKI0.png"
              alt="HexiHive Logo"
              className="h-32 w-auto"
            />
          </Link>
        </div>

        <div className="flex items-center gap-x-8">
          {user ? (
            <>
              <nav className="hidden md:flex gap-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-lg font-medium transition-colors duration-200 ${
                      pathname === link.href
                        ? 'text-white'
                        : 'text-gray-400 hover:text-white' // <-- CORRECTED THIS LINE
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-x-4">
                <button
                  onClick={handleLogout}
                  className="btn-primary py-2 px-4 rounded-md text-sm transition-all duration-500"
                >
                  Logout
                </button>
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center border-2 border-gray-600">
                  <span className="text-xl font-bold">
                    {user.email ? user.email[0].toUpperCase() : '?'}
                  </span>
                </div>
              </div>
            </>
          ) : (
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
