import React from 'react';
import { Footer, Header, PolicySection } from '@/components';
import termsOfServiceData from '@/../public/policies/terms-of-service/common.json';

export const TermsOfService = () => {
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
