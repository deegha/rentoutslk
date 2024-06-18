'use client';
import { signIn, signOut } from '@/auth/helpers';
import { useSession } from 'next-auth/react';
import React from 'react';

export default function AuthButton({ className }: { className?: string }) {
  const session = useSession();
  return session?.data?.user ? (
    <a
      className={className}
      onClick={async () => {
        await signOut();
        await signIn();
      }}
    >
      Sign Out
    </a>
  ) : (
    <a
      className={className}
      onClick={async () => {
        await signIn();
      }}
    >
      Sign In
    </a>
  );
}
