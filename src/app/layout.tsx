import './globals.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { FavouriteProvider } from '@/context/favouriteProvider/favouriteProvider';
import { SessionTimeoutProvider } from '@/context/sessionTimeout/SessionTimeoutProvider'; // Импортируйте созданный контекст

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'rentoutslk | Innovative Property Management Solutions in Sri Lanka',
  description:
    'Discover innovative property management solutions in Sri Lanka with our technology-driven approach. We are dedicated to helping our customers find effective solutions for their property needs.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0 }}>
        <div id="main">
          <SessionProvider>
            <SessionTimeoutProvider>
              <FavouriteProvider>{children}</FavouriteProvider>
            </SessionTimeoutProvider>
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}
