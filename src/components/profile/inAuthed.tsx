import Image from 'next/image';
import React from 'react';
import styles from './inAauthed.module.scss';

export const InAuthed = () => {
  return (
    <div className={styles.lockContainer}>
      <div className={styles.lockBlock}>
        <Image
          src={'/images/profile/lock.png'}
          alt={''}
          width={400}
          height={400}
          className={styles.lockImage}
        />
        <p className={styles.lockText}>Please log in to your account</p>
      </div>
    </div>
  );
};
