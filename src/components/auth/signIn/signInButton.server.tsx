import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { BASE_PATH, auth } from '@/auth';
import AuthButton from './signInButton.client';

export default async function AuthButtonServer({
  className,
}: {
  className?: string;
}) {
  const session = await auth();
  if (session && session.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
    };
  }
  return (
    <SessionProvider basePath={BASE_PATH} session={session}>
      <AuthButton className={className} />
    </SessionProvider>
  );
}
