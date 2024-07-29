import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.scss';
import { Header, RouterProfile, Footer } from '@/components';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rentoutslk',
  description: '',
};

export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
        id="main"
      >
        <Header />
        <RouterProfile />
        <div>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
