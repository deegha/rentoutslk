import { Header, Footer } from '@/components';
import { SearchProvider } from '@/context/searchProvider/searchProvider';
import RentalsClient from './rentalsClient';
import { Suspense } from 'react';

export async function generateMetadata() {
  return {
    title: 'rentoutslk | All rentals in Sri Lanka',
    description:
      'Find the best rental properties in Sri Lanka. Search through various apartments, houses, and studios with customizable filters.',
    openGraph: {
      title: 'rentoutslk | All rentals in Sri Lanka',
      description:
        'Find the best rental properties in Sri Lanka. Search through various apartments, houses, and studios with customizable filters.',
      url: 'https://rentoutslk.vercel.app/rentals',
      images: [
        {
          url: '/og.png',
          alt: 'All rentals in Sri Lanka',
        },
      ],
      siteName: 'RentoutSLK',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'rentoutslk | All rentals in Sri Lanka',
      description:
        'Find the best rental properties in Sri Lanka. Search through various apartments, houses, and studios with customizable filters.',
      images: ['/og.png'],
    },
  };
}

export default function RentalsPage() {
  return (
    <SearchProvider>
      <Header />
      <main>
        <Suspense fallback={<div></div>}>
          <RentalsClient />
        </Suspense>
      </main>
      <Footer />
    </SearchProvider>
  );
}
