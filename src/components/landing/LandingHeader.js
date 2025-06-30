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
        <nav className="pr-6">
          <a
            href="#features"
            className="hidden md:inline text-white mx-4 hover:text-gold transition"
          >
            Features
          </a>
          <a href="/login" className="btn-primary py-2 px-8 rounded-md text-sm">
            Join Beta
          </a>
        </nav>
      </div>
    </header>
  );
}
