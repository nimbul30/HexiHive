// src/components/Footer.js

export default function Footer() {
  return (
    <footer className="bg-black/30 border-t border-gray-800 py-8">
      <div className="container mx-auto text-center text-gray-400">
        <p>© 2025 HexiHive. All Rights Reserved.</p>
        <div className="mt-4 flex justify-center space-x-6">
          <a href="#" className="hover:text-white transition-colors">
            About
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
