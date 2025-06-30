// src/app/layout.js

import { Inter, Lora } from 'next/font/google'; // Import new font if needed
import './globals.css';
import { AuthContextProvider } from '@/context/AuthContext';
import Providers from '@/components/Providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });

export const metadata = {
  title: 'HexiHive - Escape the Algorithm. Build Your Vibe.',
  description:
    'A decentralized social platform where you build personalized spaces called Hexis.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lora.variable} antialiased`}>
        {/* Animated Background Wrapper */}
        <div className="background-wrapper">
          <div
            className="hexi-bg-shape"
            style={{
              width: '200px',
              height: '230px',
              top: '10%',
              left: '5%',
              animation: 'float 6s ease-in-out infinite',
            }}
          ></div>
          <div
            className="hexi-bg-shape"
            style={{
              width: '400px',
              height: '460px',
              top: '20%',
              left: '70%',
              animation: 'float 8s ease-in-out infinite',
              animationDelay: '-2s',
            }}
          ></div>
          <div
            className="hexi-bg-shape"
            style={{
              width: '150px',
              height: '170px',
              top: '70%',
              left: '20%',
              animation: 'float 7s ease-in-out infinite',
              animationDelay: '-4s',
            }}
          ></div>
        </div>

        <Providers>
          <AuthContextProvider>{children}</AuthContextProvider>
        </Providers>
      </body>
    </html>
  );
}
