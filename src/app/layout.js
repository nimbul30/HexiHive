// src/app/layout.js

import { Inter } from 'next/font/google';
import './globals.css';
import { AuthContextProvider } from '@/context/AuthContext'; // Import the provider

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'HexiHive',
  description: 'Escape the Algorithm. Build Your Vibe.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          {' '}
          {/* Wrap the app with the provider */}
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
