import React from 'react';
import { Footer, Header, PolicySection } from '@/components';
import aboutDataDeletion from '@/../public/policies/about-data-deletion/common.json';

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
