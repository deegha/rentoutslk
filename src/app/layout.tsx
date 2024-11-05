import './globals.scss';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { FavouriteProvider } from '@/context/favouriteProvider/favouriteProvider';
import { SessionTimeoutProvider } from '@/context/sessionTimeout/SessionTimeoutProvider';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://rentoutslk.vercel.app'),
  title: 'rentoutslk | Innovative Property Management Solutions In Sri Lanka',
  description:
    'Discover innovative property management solutions in Sri Lanka with our technology-driven approach.',
  openGraph: {
    title: 'RentoutSLK | Innovative Property Management Solutions',
    description:
      'Discover innovative property management solutions in Sri Lanka with our technology-driven approach.',
    url: 'https://rentoutslk.vercel.app',
    siteName: 'rentoutslk',
    images: [
      {
        url: '/og.png',
        alt: 'rentoutslk',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'rentoutslk | Innovative Property Management Solutions',
    description:
      'Discover innovative property management solutions in Sri Lanka with our technology-driven approach.',
    images: ['/og.png'],
  },
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
