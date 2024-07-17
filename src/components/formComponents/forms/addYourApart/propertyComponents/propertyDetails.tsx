import React from 'react';
import styles from './property.module.scss';
import { PropertyForm } from './propertyForm';

export const PropertyDetails = () => {
  return (
    <div className={styles.containerForm}>
      <div>
        <h2 className={styles.formTitle}>Add more details</h2>
        <p className={styles.formDesc}>
          Build your listing to find the perfect renter – listings with a lot of
          details and quality images tend to attract the most leads, so don’t be
          shy! But let’s start with the basics! details
        </p>
      </div>
      <PropertyForm />
    </div>
  );
};
