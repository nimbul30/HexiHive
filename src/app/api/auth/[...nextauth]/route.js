// src/app/api/auth/[...nextauth]/route.js

import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // This callback adds the provider and access token to the JWT
    // so it can be accessed in the session callback.
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      return token;
    },
    // This callback makes the provider and access token available
    // on the client-side session object.
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.provider = token.provider;
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error', // A custom error page for better debugging
  },
});

export { handler as GET, handler as POST };
