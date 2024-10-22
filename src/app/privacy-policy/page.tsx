import React from 'react';
import { Footer, Header, PolicySection } from '@/components';
import privacyPolicyData from '@/../public/policies/privacy-policy/common.json';

export async function generateMetadata() {
  return {
    title: 'rentoutslk | Privacy Policy',
    description:
      'Review our privacy policy to understand how we collect, use, and protect your data on rentoutslk.',
    openGraph: {
      title: 'rentoutslk | Privacy Policy',
      description:
        'Review our privacy policy to understand how we collect, use, and protect your data on rentoutslk.',
      url: 'https://rentoutslk.vercel.app/privacy-policy',
      siteName: 'RentoutSLK',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'rentoutslk | Privacy Policy',
      description:
        'Review our privacy policy to understand how we collect, use, and protect your data on rentoutslk.',
    },
  };
}

const PrivacyPolicy = () => {
  const { header, blocks } = privacyPolicyData;

  return (
    <>
      <Header />
      <PolicySection header={header} blocks={blocks} />
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
