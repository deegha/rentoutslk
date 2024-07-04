'use client';
import React, { useState, useEffect } from 'react';

import styles from './apartmentsHome.module.scss';

import { ApartmentsList } from '../apartments/apartmentsList';
import { Button } from '../button';

const getInitialCardCount = (width: number) => {
  if (width >= 1920) return 4;
  if (width >= 1440) return 3;
  if (width > 812) return 4;
  return 3;
};

export const ApartmentsHome = () => {
  const showBestOffer = true;
  const [cardCount, setCardCount] = useState(8);

  useEffect(() => {
    const handleResize = () => {
      setCardCount(getInitialCardCount(window.innerWidth));
    };

    if (typeof window !== 'undefined') {
      setCardCount(getInitialCardCount(window.innerWidth));
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  const handleShowMore = () => {
    if (typeof window !== 'undefined') {
      setCardCount(
        (prevCount) => prevCount + getInitialCardCount(window.innerWidth),
      );
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.titleBlock}>
        <h2 className={styles.title}>Apartments for you</h2>
        <p className={styles.subtitle}>
          These properties are trending. Find a place, contact owner, book a
          tour.
        </p>
      </div>
      <ApartmentsList showBestOffer={showBestOffer} cardCount={cardCount} />
      <div className={styles.btnBlock}>
        <Button
          text="Show more"
          textColor="#222222"
          fontWeight="600"
          padding="14.5px 20px"
          borderRadius="4px"
          bgColor="#ffffff"
          borderColor="#222222"
          onClick={handleShowMore}
        />
      </div>
    </section>
  );
};
