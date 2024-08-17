import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export const generateMetadata = (): Metadata => {
  return {
    title: `rentoutslk | 3br apartment in havelock city`,
    description: `3br apartment in havelock city`,
  };
};

export default function PropertyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="main">
          <SessionProvider>{children}</SessionProvider>
        </div>
      </body>
    </html>
  );
}
