// src/app/page.js

import LandingHeader from '@/components/landing/LandingHeader';
import Features from '@/components/landing/Features';
import Link from 'next/link';

// You can create components for these as well, but for simplicity, we'll keep them here for now.
function Hero() {
  return (
    <section className="text-center py-24 md:py-32">
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter">
        Escape the Algorithm.
        <br />
        <span className="text-gold">Build Your Vibe.</span>
      </h1>
      <p className="max-w-3xl mx-auto mt-6 text-lg md:text-xl text-slate-300">
        HexiHive is a decentralized social platform where you build personalized
        spaces called <b className="text-white">Hexis</b>. Showcase your
        interests, control your content, and discover others through
        community-driven trails, not opaque algorithms.
      </p>
      <div className="mt-10">
        <Link
          href="/login"
          className="btn-primary py-4 px-12 text-lg rounded-lg"
        >
          Get Your Invite
        </Link>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section id="cta" className="py-24">
      <div className="glass-panel max-w-4xl mx-auto p-12 text-center rounded-2xl">
        <h2 className="text-3xl md:text-4xl font-bold">
          Claim Your Corner of the Internet.
        </h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-slate-300">
          HexiHive is launching in a private beta. Enter your email to request
          your key to the Hive. No spam, just vibes.
        </p>
        <div className="mt-8 max-w-lg mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="you@email.com"
            className="w-full flex-grow bg-slate-800 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gold border border-slate-600"
          />
          <button className="btn-primary py-3 px-8 rounded-md w-full sm:w-auto text-base">
            Request Invite
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-24 py-10 border-t border-slate-800/50">
      <div className="container mx-auto text-center text-slate-400">
        <img
          src="https://i.imgur.com/MOtNKI0.png"
          alt="HexiHive Logo"
          className="h-8 w-auto mx-auto mb-4"
        />
        <p>© 2025 HexiHive by Mark Fitchett. All Rights Reserved.</p>
        <div className="mt-4 flex justify-center space-x-6">
          <a href="#" className="hover:text-gold transition">
            About
          </a>
          <a href="#" className="hover:text-gold transition">
            Terms
          </a>
          <a href="#" className="hover:text-gold transition">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <LandingHeader />
      <main className="container mx-auto px-6 relative z-10">
        <Hero />
        {/* You can create a component for this section too */}
        <section className="py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold tracking-tight">
                Tired of the Feed?
              </h2>
              <p className="mt-4 text-lg text-slate-300">
                Modern social media is a chaotic mess of engagement farming,
                trend-chasing, and manipulative algorithms. It's hard for
                creators to get seen and for users to find authentic content.
              </p>
            </div>
            <div className="glass-panel p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-gold">
                The HexiHive Solution
              </h3>
              <p className="mt-2 text-slate-300">
                We replace the feed with{' '}
                <b className="text-white">curated spaces</b>. We empower
                discovery through{' '}
                <b className="text-white">transparent signals</b>. We reward
                creators based on{' '}
                <b className="text-white">reputation and influence</b>, not just
                likes. It's the expressive internet, rebuilt for today.
              </p>
            </div>
          </div>
        </section>
        <Features />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
