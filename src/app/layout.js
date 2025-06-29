// src/app/layout.js

import { Inter } from 'next/font/google';
import './globals.css';
import { AuthContextProvider } from '@/context/AuthContext';
import Providers from '@/components/Providers'; // <-- 1. IMPORT

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'HexiHive',
  description: 'Escape the Algorithm. Build Your Vibe.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/*  2. WRAP THE APP  */}
        <Providers>
          <AuthContextProvider>{children}</AuthContextProvider>
        </Providers>
      </body>
    </html>
  );
}
