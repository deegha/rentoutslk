import React from 'react';
import { Footer, Header, PolicySection } from '@/components';
import privacyPolicyData from '@/../public/policies/privacy-policy/common.json';

export const PrivacyPolicy = () => {
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
