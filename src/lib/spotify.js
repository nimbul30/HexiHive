// src/lib/spotify.js

// This is the specific Spotify API endpoint we want to call
const TOP_ARTISTS_ENDPOINT =
  'https://api.spotify.com/v1/me/top/artists?limit=5';

export const getTopArtists = async (session) => {
  // The session object from next-auth contains the access token
  const { accessToken } = session;

  const response = await fetch(TOP_ARTISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    // If the request fails, log the error and return null
    console.error('Failed to fetch top artists:', response.statusText);
    return null;
  }

  return response.json();
};
