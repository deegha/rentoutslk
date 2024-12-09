import type { Metadata } from 'next';

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
