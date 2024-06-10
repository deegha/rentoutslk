import React from 'react';
import styles from './heroBanner.module.scss';
import ArrowRight from '@/icons/arrow_right_outline.svg';
import { Button } from '@/components';

export const HeroBanner = () => {
  return (
    <section className={styles.container}>
      <div className={styles.heroBlock}>
        <h1>Find your perfect apartment in Sri Lanka</h1>
        <div className={styles.searchBlock}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="City, Neighbourhood, Address"
          />
          <Button
            text="SEARCH"
            link="/"
            bgColor="#e0e0e0"
            textColor="#000000"
            padding="20px"
          />
        </div>
        <a className={styles.linkBlock}>
          <p>See All Options</p>
          <ArrowRight />
        </a>
      </div>
    </section>
  );
};
