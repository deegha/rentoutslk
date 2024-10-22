import React from 'react';
import { Footer, Header, PolicySection } from '@/components';
import aboutDataDeletion from '@/../public/policies/about-data-deletion/common.json';

export async function generateMetadata() {
  return {
    title: 'rentoutslk | Data Deletion Policy',
    description:
      'Learn about our data deletion policy and how we handle user data removal requests at rentoutslk.',
    openGraph: {
      title: 'rentoutslk | Data Deletion Policy',
      description:
        'Learn about our data deletion policy and how we handle user data removal requests at rentoutslk.',
      url: 'https://rentoutslk.vercel.app/about-data-deletion',
      siteName: 'RentoutSLK',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'rentoutslk | Data Deletion Policy',
      description:
        'Learn about our data deletion policy and how we handle user data removal requests at rentoutslk.',
    },
  };
}

const AboutDataDeletion = () => {
  const { header, blocks } = aboutDataDeletion;

  return (
    <>
      <Header />
      <PolicySection header={header} blocks={blocks} />
      <Footer />
    </>
  );
};

export default AboutDataDeletion;
