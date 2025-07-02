// src/app/auth/error/page.js
'use client';

import { useSearchParams } from 'next/navigation';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>
      <h1>Authentication Error</h1>
      <p>An error occurred during authentication. Please try again.</p>
      {error && (
        <p>
          <strong>Error:</strong> {error}
        </p>
      )}
    </div>
  );
}
