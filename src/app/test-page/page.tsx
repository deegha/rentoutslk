'use client';
import { useEffect } from 'react';
import { getSession } from 'next-auth/react';

export default function TestPage() {
  useEffect(() => {
    const timer = setTimeout(async () => {
      const session = await getSession();
      console.log('Session after delay:', session);
    }, 15000); // Через 15 секунд

    return () => clearTimeout(timer);
  }, []);

  return <div>Check console after 15 seconds</div>;
}
