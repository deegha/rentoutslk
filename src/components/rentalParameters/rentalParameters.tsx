import React from 'react';

import styles from './rentalParameters.module.scss';

export const RentalParameters = () => {
  return (
    <section className={styles.container}>
      <div className={styles.parametersBlock}>
        <div className={styles.parametersItem}>
          <p className={styles.itemTitle}>Location</p>
          <div className={styles.itemBlock}></div>
        </div>
      </div>
    </section>
  );
};
