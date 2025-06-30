// src/components/landing/LandingHeader.js

import Link from 'next/link';

export default function LandingHeader() {
  return (
    <header className="w-full sticky top-0 z-50 glass-panel">
      <div className="w-full flex justify-between items-center">
        <Link href="/">
          <img
            src="https://i.imgur.com/MOtNKI0.png"
            alt="HexiHive Logo"
            className="h-32 w-auto"
          />
        </Link>
        {/* Updated nav section */}
        <nav className="pr-6 flex items-center gap-x-6">
          <a
            href="#features"
            className="hidden md:inline text-white hover:text-gold transition"
          >
            Features
          </a>
          {/* New Login Link */}
          <Link
            href="/login"
            className="text-white hover:text-gold transition font-medium"
          >
            Login
          </Link>
          {/* Existing Join Beta Button */}
          <Link
            href="/login"
            className="btn-primary py-2 px-8 rounded-md text-sm"
          >
            Join Beta
          </Link>
        </nav>
      </div>
    </header>
  );
}
