import React from 'react';

import styles from './aboutProperty.module.scss';
import { AboutPropertyItem } from './aboutPropertyItem';

export const AboutProperty = () => {
  return (
    <section className={styles.container}>
      <div className={styles.block}>
        <h3 className={styles.title}>About this property</h3>
        <div className={styles.itemsBlock}>
          <AboutPropertyItem name="Property type:" value="Apartment" />
          <AboutPropertyItem name="City:" value="Colombo" />
          <AboutPropertyItem name="Bedrooms:" value="2" />
          <AboutPropertyItem name="Bathrooms:" value="1" />
          <AboutPropertyItem name="Furniture:" value="Yes" />
          <AboutPropertyItem name="Price:" value="54 244 Re" />
          <AboutPropertyItem name="Elevator:" value="Yes" />
          <AboutPropertyItem name="Gym:" value="Yes" />
          <AboutPropertyItem name="Floor area:" value="100 sq ft" />
          <AboutPropertyItem name="Deposit:" value="54 244 Re" />
          <AboutPropertyItem name="Pool:" value="No" />
          <AboutPropertyItem name="Parking:" value="Yes" />
          <AboutPropertyItem name="Balcony:" value="Yes" />
        </div>
      </div>
    </section>
  );
};
