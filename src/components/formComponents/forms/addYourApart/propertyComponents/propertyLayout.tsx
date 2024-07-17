import React from 'react';
import { PropertyDetails } from './propertyDetails';
import Image from 'next/image';
import styles from './property.module.scss';

export const PropertyLayout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerStep}>
        <div className={styles.containerStepText}>
          <h4 className={styles.step}>Step 1:</h4>
          <h2 className={styles.title}>
            Share some basic details about your place - it&apos;s easy and free!
          </h2>
          <p className={styles.subtitle}>
            Share some basic info, like where it is and how many bedrooms you
            have.
          </p>
        </div>
        <div>
          <Image
            src={'/images/property/propertyImage.png'}
            alt={'Appartament'}
            width={500}
            height={500}
          />
        </div>
      </div>
      <PropertyDetails />
    </div>
  );
};
