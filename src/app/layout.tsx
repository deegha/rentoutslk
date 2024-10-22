import './globals.scss';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { FavouriteProvider } from '@/context/favouriteProvider/favouriteProvider';
import { SessionTimeoutProvider } from '@/context/sessionTimeout/SessionTimeoutProvider';

const inter = Inter({ subsets: ['latin'] });

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
