// src/app/page.js

import Header from '@/components/Header';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
        {/* The content from your HexiHive.html hero section can go here */}
        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 leading-tight text-white">
          Escape the Algorithm.
          <br />
          <span className="text-red-400">Build Your Vibe.</span>
        </h2>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200 mb-8">
          HexiHive is the algorithm-free playground for curators. Design your
          personal space and discover authentic content through social trails,
          not feeds.
        </p>
      </main>
    </>
  );
}
