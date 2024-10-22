import {
  Header,
  HeroBanner,
  CreateListingBanner,
  LookingFor,
  Footer,
  ApartmentsHome,
} from '@/components';
import { SearchProvider } from '@/context/searchProvider/searchProvider';

export async function generateMetadata() {
  return {
    title: 'rentoutslk | Innovative Property Management Solutions in Sri Lanka',
    description:
      'Discover innovative property management solutions in Sri Lanka with our technology-driven approach. We are dedicated to helping our customers find effective solutions for their property needs.',
    openGraph: {
      title:
        'rentoutslk | Innovative Property Management Solutions in Sri Lanka',
      description:
        'Discover innovative property management solutions in Sri Lanka with our technology-driven approach. We are dedicated to helping our customers find effective solutions for their property needs.',
      url: 'https://rentoutslk.vercel.app',
      images: [
        {
          url: '/og.png',
          alt: 'Innovative Property Management Solutions in Sri Lanka',
        },
      ],
      siteName: 'RentoutSLK',
    },
    twitter: {
      card: 'summary_large_image',
      title:
        'rentoutslk | Innovative Property Management Solutions in Sri Lanka',
      description:
        'Discover innovative property management solutions in Sri Lanka with our technology-driven approach. We are dedicated to helping our customers find effective solutions for their property needs.',
      images: ['/og.png'],
    },
  };
}

export default function Home() {
  return (
    <SearchProvider>
      <Header />
      <main>
        <HeroBanner />
        <ApartmentsHome />
        <CreateListingBanner />
        <LookingFor />
      </main>
      <Footer />
    </SearchProvider>
  );
}
