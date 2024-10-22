import React from 'react';
import { Footer, Header, PolicySection } from '@/components';
import termsOfServiceData from '@/../public/policies/terms-of-service/common.json';

export async function generateMetadata() {
  return {
    title: 'rentoutslk | Terms of Service',
    description:
      'Read our terms of service to understand the rules and guidelines for using rentoutslk.',
    openGraph: {
      title: 'rentoutslk | Terms of Service',
      description:
        'Read our terms of service to understand the rules and guidelines for using rentoutslk.',
      url: 'https://rentoutslk.vercel.app/terms-of-service',
      siteName: 'RentoutSLK',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'rentoutslk | Terms of Service',
      description:
        'Read our terms of service to understand the rules and guidelines for using rentoutslk.',
    },
  };
}

const TermsOfService = () => {
  const { header, blocks } = termsOfServiceData;

  return (
    <>
      <Header />
      <PolicySection header={header} blocks={blocks} />
      <Footer />
    </>
  );
};

export default TermsOfService;
