import React from 'react';

import styles from './apartmentsCard.module.scss';

import Size from '@/icons/size.svg';
import Bedrooms from '@/icons/bedrooms.svg';
import Type from '@/icons/type.svg';

export const ApartmentsCard = () => {
  return (
    <div className={styles.cardBlock}>
      <div className={styles.cardImageBlock}></div>
      <div className={styles.cardDetailsBlock}>
        <div className={styles.cardDescBlock}>
          <p className={styles.cardPrice}>54 244 Re</p>
          <p className={styles.cardTitle}>
            Sunny Deck Neightbourhood in Colombo South-East
          </p>
          <p className={styles.cardLocation}>
            12 Thorakolayaya, Middeniya Road
          </p>
        </div>
        <div className={styles.featuresBlock}>
          <div className={styles.featuresItem}>
            <Size />
            <p className={styles.featuresTitle}>Size</p>
            <p className={styles.featuresDesc}>65 m2</p>
          </div>
          <div className={styles.featuresItem}>
            <Bedrooms />
            <p className={styles.featuresTitle}>Bedrooms</p>
            <p className={styles.featuresDesc}>3</p>
          </div>
          <div className={styles.featuresItem}>
            <Type />
            <p className={styles.featuresTitle}>Type</p>
            <p className={styles.featuresDesc}>Apartment</p>
          </div>
        </div>
        <div className={styles.showAll}>
          <a href="">Show all rentals</a>
        </div>
      </div>
    </div>
  );
};
