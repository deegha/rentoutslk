import React from 'react';

import styles from './apartmentsHome.module.scss';

import { ApartmentsList } from '@/components';

export const ApartmentsHome = () => {
  return (
    <section className={styles.container}>
      <div className={styles.titleBlock}>
        <h2 className={styles.title}>Apartments for you</h2>
        <p className={styles.subtitle}>
          These properties are trending. Find a place, contact owner, book a
          tour.
        </p>
      </div>
      <ApartmentsList
        showBestOffer={true}
        buttonText="Show more"
        buttonTextColor="#222222"
        buttonFontWeight="600"
        buttonPadding="14.5px 20px"
        buttonBorderRadius="4px"
        buttonBgColor="#ffffff"
        buttonBorderColor="#222222"
      />
    </section>
  );
};
