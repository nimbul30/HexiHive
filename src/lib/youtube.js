// src/lib/youtube.js

// This is the YouTube API endpoint for fetching the authenticated user's subscriptions.
const SUBSCRIPTIONS_ENDPOINT =
  'https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=10';

export const getMySubscriptions = async (session) => {
  // The session object from next-auth contains the access token needed for the API call.
  const { accessToken } = session;

  const response = await fetch(SUBSCRIPTIONS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    // If the request fails, log the error and return null.
    const errorData = await response.json();
    console.error(
      'Failed to fetch YouTube subscriptions:',
      response.statusText,
      errorData
    );
    return null;
  }

  return response.json();
};
