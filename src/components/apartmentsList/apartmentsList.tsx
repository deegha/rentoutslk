'use client';
import React, { useState, useEffect } from 'react';

import styles from './apartmentsList.module.scss';

import { ApartmentsCard } from '@/components';
import { Button } from '../button';

interface ApartmentsListProps {
  showBestOffer: boolean;
  buttonText: string;
  buttonTextColor: string;
  buttonFontWeight: string;
  buttonPadding: string;
  buttonBorderRadius: string;
  buttonBgColor: string;
  buttonBorderColor: string;
}

const getInitialCardCount = (width: number) => {
  if (width >= 1920) return 4;
  if (width >= 1440) return 3;
  if (width > 812) return 4;
  return 3;
};

export const ApartmentsList: React.FC<ApartmentsListProps> = ({
  showBestOffer,
  buttonText,
  buttonTextColor,
  buttonFontWeight,
  buttonPadding,
  buttonBorderRadius,
  buttonBgColor,
  buttonBorderColor,
}) => {
  const [cardCount, setCardCount] = useState<number | null>(null);

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
      setCardCount((prevCount) =>
        prevCount !== null
          ? prevCount + getInitialCardCount(window.innerWidth)
          : getInitialCardCount(window.innerWidth),
      );
    }
  };

  if (cardCount === null) {
    return null;
  }

  const list = {
    address: '',
    availableFrom: '',
    deposit: '',
    floorArea: '',
    propertyType: '',
    monthlyRent: '',
    title: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    image5: '',
    image6: '',
    image7: '',
    image8: '',
    image9: '',
    numberBedrooms: '',
    createdAt: '',
  };

  const cards = Array.from({ length: cardCount }, (_, index) => (
    <ApartmentsCard listing={list} key={index} showBestOffer={showBestOffer} />
  ));

  return (
    <div className={styles.container}>
      <div className={styles.list}>{cards}</div>
      <div className={styles.btnBlock}>
        <Button
          text={buttonText}
          textColor={buttonTextColor}
          fontWeight={buttonFontWeight}
          padding={buttonPadding}
          borderRadius={buttonBorderRadius}
          bgColor={buttonBgColor}
          borderColor={buttonBorderColor}
          onClick={handleShowMore}
        />
      </div>
    </div>
  );
};
