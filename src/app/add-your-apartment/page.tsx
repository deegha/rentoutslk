import { Header, MultiStepFormApparts, Footer } from '@/components';
import { Suspense } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

export async function generateMetadata() {
  return {
    title: 'rentoutslk | List your property',
    description:
      'List your property on rentoutslk and reach more potential tenants in Sri Lanka.',
    openGraph: {
      title: 'rentoutslk | List your property',
      description:
        'List your property on rentoutslk and reach more potential tenants in Sri Lanka.',
      url: 'https://rentoutslk.vercel.app/add-your-apartment',
      images: [
        {
          url: '/og.png',
          alt: 'List your property on rentoutslk',
        },
      ],
      siteName: 'RentoutSLK',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'rentoutslk | List your property',
      description:
        'List your property on rentoutslk and reach more potential tenants in Sri Lanka.',
      images: ['/og.png'],
    },
  };
}

const AddYourApart = () => {
  return (
    <>
      <Header />
      <main>
        <Suspense
          fallback={
            <div style={{ textAlign: 'center', marginTop: '20vh' }}>
              <BeatLoader color="#DE225C" />
            </div>
          }
        >
          <MultiStepFormApparts />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default AddYourApart;
