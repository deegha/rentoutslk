import React from 'react';
import styles from './heroBanner.module.scss';
import ArrowRight from '@/icons/arrow_right_outline.svg';

export const HeroBanner = () => {
  return (
    <section className={styles.container}>
      <div className={styles.heroBlock}>
        <h1>Find your perfect apartment in Sri Lanka</h1>
        <div>SEARCH</div>
        <a className={styles.linkBlock}>
          <p>See All Options</p>
          <ArrowRight />
        </a>
      </div>
    </section>
  );
};
