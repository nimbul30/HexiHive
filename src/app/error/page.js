// src/app/auth/error/page.js
'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// Create a new component that uses the hook
function ErrorMessage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <>
      <h1>Authentication Error</h1>
      <p>An error occurred during authentication. Please try again.</p>
      {error && (
        <p>
          <strong>Error:</strong> {error}
        </p>
      )}
    </>
  );
}

// The main page component
export default function AuthErrorPage() {
  return (
    <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>
      {/* Wrap the new component in a Suspense boundary */}
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorMessage />
      </Suspense>
    </div>
  );
}
