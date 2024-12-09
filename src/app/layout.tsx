'use client';
import React, { useEffect } from 'react';
import './globals.scss';
import { Inter } from 'next/font/google';
import { SessionProvider, useSession } from 'next-auth/react';
import { FavouriteProvider } from '@/context/favouriteProvider/favouriteProvider';
import { reAuthenticateWithFirebase } from '../utils/reauthFirebase';
import { refreshGoogleToken } from '@/utils/googleAuthUtils'; // Ваша функция рефреша

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0 }}>
        <SessionProvider>
          <AppProviders>{children}</AppProviders>
        </SessionProvider>
      </body>
    </html>
  );
}

function AppProviders({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  useEffect(() => {
    (async () => {
      if (session?.user?.exp && Date.now() / 1000 > session.user.exp) {
        const refreshToken = session.user.refreshToken;
        if (!refreshToken) {
          console.error('No refresh token available, cannot refresh.');
          return;
        }

        try {
          const refreshed = await refreshGoogleToken(refreshToken);
          if (refreshed && refreshed.id_token) {
            await reAuthenticateWithFirebase(refreshed.id_token);
            console.log('Successfully re-authenticated with Firebase.');
          } else {
            console.error(
              'Failed to refresh token or no id_token in response.',
            );
          }
        } catch (error) {
          console.error('Failed to re-authenticate with Firebase:', error);
        }
      }
    })();
  }, [session?.user?.exp, session?.user?.refreshToken]);

  return <FavouriteProvider>{children}</FavouriteProvider>;
}
