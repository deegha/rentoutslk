import React from 'react';

import styles from './aboutProperty.module.scss';
import { AboutPropertyItem } from './aboutPropertyItem';
import { PropertyProps } from '@/interface/property';

export const AboutProperty = ({ property }: { property: PropertyProps }) => {
  const {
    // image1,
    // image5,
    // title,
    floorArea,
    // image8,
    numberBedrooms,
    // image2,
    // furnishing,
    // rentalPeriod,
    // createdAt,
    // image6,
    propertyType,
    // views,
    // image7,
    // customQuestion,
    monthlyRent,
    // image9,
    // favorite,
    // address,
    // image4,
    // status,
    deposit,
    numberBathrooms,
  } = property;
  return (
    <section className={styles.container}>
      <div className={styles.block}>
        <h3 className={styles.title}>About this property</h3>
        <div className={styles.itemsBlock}>
          <AboutPropertyItem name="Property type:" value={propertyType} />
          <AboutPropertyItem name="City:" value="Colombo" />
          <AboutPropertyItem name="Bedrooms:" value={numberBedrooms} />
          <AboutPropertyItem name="Bathrooms:" value={numberBathrooms} />
          <AboutPropertyItem name="Furniture:" value="Yes" />
          <AboutPropertyItem name="Price:" value={`${monthlyRent} Re`} />
          <AboutPropertyItem name="Elevator:" value="Yes" />
          <AboutPropertyItem name="Gym:" value="Yes" />
          <AboutPropertyItem name="Floor area:" value={`${floorArea} m2`} />
          <AboutPropertyItem name="deposit:" value={`${deposit} Re`} />
          <AboutPropertyItem name="Pool:" value="No" />
          <AboutPropertyItem name="Parking:" value="Yes" />
          <AboutPropertyItem name="Balcony:" value="Yes" />
        </div>
      </div>
    </section>
  );
};
