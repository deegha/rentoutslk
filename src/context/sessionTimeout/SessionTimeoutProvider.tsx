'use client';

import React, { useEffect, createContext, useContext } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { UserRent } from '@/interface/session';

interface SessionTimeoutContextProps {
  sessionExpiresAt: number | null;
}

const SessionTimeoutContext = createContext<
  SessionTimeoutContextProps | undefined
>(undefined);

export const SessionTimeoutProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') {
      return;
    }

    if (status === 'authenticated' && session?.user) {
      const user = session.user as UserRent;

      if (user.exp) {
        const expiresInMilliseconds = user.exp * 1000 - Date.now();
        const MAX_TIMEOUT = 2147483647;

        if (expiresInMilliseconds > 0) {
          const timeoutId = setTimeout(
            () => {
              signOut();
            },
            Math.min(expiresInMilliseconds, MAX_TIMEOUT),
          );
          return () => clearTimeout(timeoutId);
        } else {
          signOut();
        }
      }
    }
  }, [session, status]);

  return (
    <SessionTimeoutContext.Provider
      value={{ sessionExpiresAt: (session?.user as UserRent)?.exp || null }}
    >
      {children}
    </SessionTimeoutContext.Provider>
  );
};

export const useSessionTimeout = () => {
  const context = useContext(SessionTimeoutContext);
  if (context === undefined) {
    throw new Error(
      'useSessionTimeout должен использоваться внутри SessionTimeoutProvider',
    );
  }
  return context;
};
