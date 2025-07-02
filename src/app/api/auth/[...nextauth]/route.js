// src/app/api/auth/[...nextauth]/route.js

import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import GoogleProvider from 'next-auth/providers/google';

const spotifyScopes = [
  'user-top-read',
  'playlist-read-private',
  'user-read-email',
].join(',');

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: `https://accounts.spotify.com/authorize?scope=${spotifyScopes}`,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // By not specifying the 'authorization' object, NextAuth.js will use the default,
      // secure URL which is less prone to misconfiguration.
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = account.id;
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      session.provider = token.provider;
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error', // Redirect to a custom error page
  },
});

export { handler as GET, handler as POST };
