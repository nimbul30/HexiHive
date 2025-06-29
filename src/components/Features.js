// src/components/Features.js

export default function Features() {
  return (
    <section className="py-20 px-4 bg-black/30 backdrop-blur-md">
      <div className="container mx-auto text-center">
        <h3 className="text-4xl font-bold mb-2">MySpace for the Modern Age</h3>
        <p className="text-gray-300 text-lg mb-12">
          Fast, functional, and focused on what matters: you.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1: Customizable Hexis */}
          <div className="bg-gray-800/80 p-8 rounded-xl shadow-lg">
            <div className="bg-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                ></path>
              </svg>
            </div>
            <h4 className="text-2xl font-bold mb-3">Customizable Hexis</h4>
            <p className="text-gray-400">
              Build your personal space with drag-and-drop blocks for music,
              art, links, and thoughts. No code required.
            </p>
          </div>

          {/* Feature 2: Curation-First Discovery */}
          <div className="bg-gray-800/80 p-8 rounded-xl shadow-lg">
            <div className="bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Note: The transform attributes are removed as they are complex to replicate without custom CSS. The visual is still effective. */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v11.494m-9-5.747h18"
                ></path>
              </svg>
            </div>
            <h4 className="text-2xl font-bold mb-3">Authentic Discovery</h4>
            <p className="text-gray-400">
              Forget the feed. Discover new creators by following "Social
              Trails" — organic paths of who discovered who.
            </p>
          </div>

          {/* Feature 3: Music Integration */}
          <div className="bg-gray-800/80 p-8 rounded-xl shadow-lg">
            <div className="bg-orange-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19V6l10-3v13M9 19c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm10 0c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2z"
                ></path>
              </svg>
            </div>
            <h4 className="text-2xl font-bold mb-3">Deep Music Integration</h4>
            <p className="text-gray-400">
              Sync your Spotify and YouTube accounts to create the ultimate vibe
              check. Share playlists, tracks, and music videos effortlessly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
