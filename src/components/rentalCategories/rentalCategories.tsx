import React from 'react';

import styles from './rentalCategories.module.scss';

import Arrow from '@/icons/arrow_right_gray.svg';

export const RentalCategories = () => {
  return (
    <section className={styles.container}>
      <p className={styles.category}>Rentouts</p>
      <Arrow />
      <p className={styles.category}>Rentals</p>
      <Arrow />
      <p className={styles.categoryActive}>Colombo</p>
    </section>
  );
};
