import React from 'react';

import styles from './trendingProperties.module.scss';
import { ApartmentsList } from '../apartmentsList';

export const TrendingProperties = () => {
  return (
    <section className={styles.container}>
      <h3 className={styles.title}>Trending properties in this area</h3>
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
    </section>
  );
};
