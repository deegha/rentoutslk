import React from 'react';
import Image from 'next/image';

import styles from './property.module.scss';

import { ImageUploadSection } from '../imageUpload';

interface PropertyAddImageProps {
  breadcrumbs: React.ReactNode;
}

export const PropertyAddImage: React.FC<PropertyAddImageProps> = ({
  breadcrumbs,
}) => {
  return (
    <section className={styles.container}>
      <div className={styles.containerWrapper}>
        <div className={styles.containerStep}>
          <div className={styles.containerStepText}>
            <h4 className={styles.step}>Step 2:</h4>
            <h2 className={styles.title}>Add images and shine!</h2>
            <p className={styles.subtitle}>
              Showcase your place with great photographs —they&apos;re
              instrumental in helping prospective tenants choose your place in
              no time!
            </p>
          </div>
          <div>
            <Image
              src={'/images/property/addPropertyImage.png'}
              alt={'Appartament'}
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
      <div className={styles.sectionWrapper}>
        {breadcrumbs}
        <ImageUploadSection />
      </div>
    </section>
  );
};
