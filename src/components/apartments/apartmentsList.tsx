import React from 'react';

import styles from './apartmentsList.module.scss';

import { ApartmentsCard } from './apartmentsCard';

export const ApartmentsList = () => {
  return (
    <div className={styles.list}>
      <ApartmentsCard />
      <ApartmentsCard />
      <ApartmentsCard />
      <ApartmentsCard />
      <ApartmentsCard />
      <ApartmentsCard />
      <ApartmentsCard />
      <ApartmentsCard />
    </div>
  );
};
