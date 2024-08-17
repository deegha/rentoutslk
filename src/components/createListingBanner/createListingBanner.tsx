import React from 'react';
import styles from './createListingBanner.module.scss';
import { Button } from '../button';

export const CreateListingBanner = () => {
  return (
    <section className={styles.container}>
      <div className={styles.bannerBlock}>
        <div className={styles.titleBlock}>
          <h2 className={styles.title}>
            Would you like to rent out your property?
          </h2>
          <p className={styles.description}>
            Create a tee listing in 3 simple steps and get contacted by
            interested tenants.{' '}
          </p>
        </div>
        <Button
          text="Create listing for free"
          link="/add-your-apartment"
          bgColor="#222222"
          textColor="#FFFFFF"
          padding="14.5px 28px"
          fontWeight="700"
        />
      </div>
    </section>
  );
};
