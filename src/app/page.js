// src/app/page.js

import Header from '@/components/Header';
import Features from '@/components/Features';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
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
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105">
              Create Your Hexi
            </button>
            <button className="w-full sm:w-auto bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors">
              How it Works
            </button>
          </div>
        </section>

        {/* Features Section */}
        <Features />

        {/* Call to Action Section */}
        <CallToAction />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
