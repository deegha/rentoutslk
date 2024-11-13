import React from 'react';

import styles from './aboutProperty.module.scss';
import { AboutPropertyItem } from './aboutPropertyItem';
import { PropertyProps } from '@/interface/property';

export const AboutProperty = ({ property }: { property: PropertyProps }) => {
  const {
    city,
    floorArea,
    numberBedrooms,
    propertyType,
    monthlyRent,
    deposit,
    numberBathrooms,
    furnishing,
    gym,
    pool,
    elevator,
    parking,
    playground,
    hotWater,
    conditioner,
  } = property;
  return (
    <section className={styles.container}>
      <div className={styles.block}>
        <h3 className={styles.title}>About this property</h3>
        <div className={styles.itemsBlock}>
          <AboutPropertyItem name="Property type:" value={propertyType} />
          <AboutPropertyItem name="City:" value={city} />
          <AboutPropertyItem name="Bedrooms:" value={numberBedrooms} />
          <AboutPropertyItem name="Bathrooms:" value={numberBathrooms} />
          <AboutPropertyItem name="Furniture:" value={furnishing} />
          <AboutPropertyItem
            name="Price:"
            value={`${monthlyRent.toLocaleString('en-US')} LKR`}
          />
          <AboutPropertyItem name="Elevator:" value={elevator ? 'Yes' : 'No'} />
          <AboutPropertyItem name="Gym:" value={gym ? 'Yes' : 'No'} />
          <AboutPropertyItem name="Floor area:" value={`${floorArea} m²`} />
          <AboutPropertyItem name="Deposit:" value={`${deposit} LKR`} />
          <AboutPropertyItem name="Pool:" value={pool ? 'Yes' : 'No'} />
          <AboutPropertyItem name="Parking:" value={parking ? 'Yes' : 'No'} />
          <AboutPropertyItem
            name="Playground:"
            value={playground ? 'Yes' : 'No'}
          />
          <AboutPropertyItem
            name="Hot Water:"
            value={hotWater ? 'Yes' : 'No'}
          />
          <AboutPropertyItem
            name="Conditioner:"
            value={conditioner ? 'Yes' : 'No'}
          />
        </div>
      </div>
    </section>
  );
};
