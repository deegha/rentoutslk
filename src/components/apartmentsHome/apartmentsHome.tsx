import React from 'react';

import styles from './apartmentsHome.module.scss';

import { ApartmentsList } from '../apartments/apartmentsList';
import { Button } from '../button';

export const ApartmentsHome = () => {
  return (
    <section className={styles.container}>
      <div className={styles.titleBlock}>
        <h2 className={styles.title}>Apartments for you</h2>
        <p className={styles.subtitle}>
          This properties are tending. Find a place, contact owner, book a tour.
        </p>
      </div>
      <ApartmentsList />
      <div className={styles.btnBlock}>
        <Button
          text="Show more"
          textColor="#222222"
          fontWeight="600"
          padding="14.5px 20px"
          borderRadius="4px"
          bgColor="#ffffff"
          borderColor="#222222"
        />
      </div>
    </section>
  );
};
