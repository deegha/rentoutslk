import Image from 'next/image';
import React from 'react';
import styles from './notFoundSection.module.scss';

export const NotFoundSection = () => {
  return (
    <div className={styles.lockContainer}>
      <div className={styles.lockBlock}>
        <Image
          src={'/images/not-found.png'}
          alt={'Page is not foind'}
          width={400}
          height={400}
          className={styles.lockImage}
        />
        <p className={styles.lockText}>
          Oops! We can’t seem to find the page you’re looking for
        </p>
      </div>
    </div>
  );
};
