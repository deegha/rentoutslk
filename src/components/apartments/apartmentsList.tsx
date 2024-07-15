import React from 'react';

import styles from './apartmentsList.module.scss';

import { ApartmentsCard } from './apartmentsCard';

export const ApartmentsList = () => {
  return (
    <div className={styles.list}>
      <ApartmentsCard
        price={'54 000'}
        title={'Sunny Deck Neightbourhood in Colombo South-East'}
        location={'12 Thorakolayaya, Middeniya Road'}
        sizeInMeters={'65'}
        numberBedrooms={'3'}
        typeOfObject={'appartament'}
        id={'23fw'}
      />
    </div>
  );
};
