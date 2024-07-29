import React from 'react';

import styles from './apartmentsRental.module.scss';
import { ApartmentsList, TagsList } from '@/components';

export const ApartmentsRental = () => {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.availableRents}>
          <p>
            <span className={styles.availableCount}>100</span>available rentals
            in Colombo
          </p>
        </div>
        <TagsList />
        <ApartmentsList
          showBestOffer={false}
          buttonText="Show more"
          buttonTextColor="#222222"
          buttonFontWeight="600"
          buttonPadding="14.5px 20px"
          buttonBorderRadius="4px"
          buttonBgColor="#f7f7f7"
          buttonBorderColor="#222222"
        />
      </div>
      <div></div>
    </section>
  );
};
