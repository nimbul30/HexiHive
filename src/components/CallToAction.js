// src/components/CallToAction.js

export default function CallToAction() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center max-w-3xl">
        <h3 className="text-4xl font-bold mb-4">Ready to Curate?</h3>
        <p className="text-gray-300 text-lg mb-8">
          Join a community that values taste, not just trends. Sign up for the
          private beta and be one of the first to claim your corner of the
          internet.
        </p>
        <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full flex-grow bg-gray-800 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-md transition-colors">
            Request Invite
          </button>
        </div>
      </div>
    </section>
  );
}
