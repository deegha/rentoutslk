import React from 'react';

import styles from './aboutProperty.module.scss';
import { AboutPropertyItem } from './aboutPropertyItem';
import { PropertyProps } from '@/interface/property';

export const AboutProperty = ({ property }: { property: PropertyProps }) => {
  const {
    place,
    floorArea,
    numberBedrooms,
    propertyType,
    monthlyRent,
    deposit,
    numberBathrooms,
  } = property;
  return (
    <section className={styles.container}>
      <div className={styles.block}>
        <h3 className={styles.title}>About this property</h3>
        <div className={styles.itemsBlock}>
          <AboutPropertyItem name="Property type:" value={propertyType} />
          <AboutPropertyItem name="City:" value={place} />
          <AboutPropertyItem name="Bedrooms:" value={numberBedrooms} />
          <AboutPropertyItem name="Bathrooms:" value={numberBathrooms} />
          <AboutPropertyItem name="Furniture:" value="Yes" />
          <AboutPropertyItem name="Price:" value={`${monthlyRent} LKR`} />
          <AboutPropertyItem name="Elevator:" value="Yes" />
          <AboutPropertyItem name="Gym:" value="Yes" />
          <AboutPropertyItem name="Floor area:" value={`${floorArea} m2`} />
          <AboutPropertyItem name="Deposit:" value={`${deposit} LKR`} />
          <AboutPropertyItem name="Pool:" value="No" />
          <AboutPropertyItem name="Parking:" value="Yes" />
          <AboutPropertyItem name="Balcony:" value="Yes" />
        </div>
      </div>
    </section>
  );
};
