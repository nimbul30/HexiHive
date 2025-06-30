// Word Spinner Component - for use inside Features
function WordSpinner() {
  const words = [
    'Curators',
    'Tastemakers',
    'Explorers',
    'Trendsetters',
    'Collectors',
    'Aesthetes',
    'Connoisseurs',
    'Discoverers',
    'Culture Shapers',
    'Vibe Architects',
    'Scene Builders',
  ];
  const listItems = [...words, ...words]; // Duplicate for seamless loop

  return (
    <div className="word-spinner-container">
      <div className="word-spinner-list">
        {listItems.map((word, index) => (
          <span key={index} className="text-gold">
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}

// Features Section Component
export default function Features() {
  const features = [
    {
      title: 'What is a Hexi?',
      description:
        "Your vibe. Your curation. Music. Videos. Playlists. People. Aesthetic. It's yours.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-gold"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: 'Curation-First Discovery',
      description:
        'No feed. Discover content through Social Trails, Taste Tags, and reputation-based Leaderboards. Find what you love through people you trust.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-gold"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6.253v11.494m-9-5.747h18"
          />
        </svg>
      ),
    },
    {
      title: 'Deep Music Integration',
      description:
        'Sync your Spotify and YouTube accounts. Create the ultimate vibe check with emoji-driven mood tags and shareable music showcases.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-gold"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 19V6l10-3v13M9 19c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm10 0c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2z"
          />
        </svg>
      ),
    },
    {
      title: 'Lazy-User Friendly',
      description:
        'Get started in seconds. Use one-click templates based on your imported interests or clone and remix a Hexi layout that inspires you.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-gold"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: 'Creator Rewards',
      description:
        'A system built on transparent attribution. Earn rewards based on meaningful engagement: saves, time spent, and trail initiations.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-gold"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01"
          />
        </svg>
      ),
    },
  ];

  return (
    <section id="features" className="py-24">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight flex items-center justify-center flex-wrap gap-x-3">
          <span>A Platform Built for</span>
          <span className="text-gold">-</span>
          <WordSpinner />
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-300">
          HexiHive provides the tools to build, share, and discover with
          intention.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="glass-panel p-8 rounded-xl flex flex-col items-center text-center transition-all duration-300 hover:border-gold/50"
          >
            <div className="hexi-icon-shape w-20 h-24 flex items-center justify-center bg-slate-700">
              {feature.icon}
            </div>
            <h3 className="mt-6 text-2xl font-bold">{feature.title}</h3>
            <p className="mt-2 text-slate-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
