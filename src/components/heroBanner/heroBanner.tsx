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
            bgColor="#DE225C"
            textColor="#FFFFFF"
            padding="20px"
            fontWeight="600"
          />
        </div>
        <a className={styles.linkBlock}>
          <p>See all rentals</p>
          <ArrowRight />
        </a>
      </div>
    </section>
  );
};
