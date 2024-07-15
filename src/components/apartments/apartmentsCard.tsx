import React from 'react';
import styles from './apartmentsCard.module.scss';
import Size from '@/icons/size.svg';
import Bedrooms from '@/icons/bedrooms.svg';
import Type from '@/icons/type.svg';
import Link from 'next/link';

interface ApartmentsCardProps {
  price: string;
  title: string;
  location: string;
  sizeInMeters: string;
  numberBedrooms: string;
  typeOfObject: string;
  id: string;
}
export const ApartmentsCard: React.FC<ApartmentsCardProps> = ({
  price,
  title,
  location,
  sizeInMeters,
  numberBedrooms,
  id,
  typeOfObject,
}) => {
  return (
    <Link href={`/apartament/${id}`} className={styles.cardBlock}>
      <div className={styles.cardImageBlock}></div>
      <div className={styles.cardDetailsBlock}>
        <div className={styles.cardDescBlock}>
          <p className={styles.cardPrice}>{price} Re</p>
          <p className={styles.cardTitle}>
            {/* Sunny Deck Neightbourhood in Colombo South-East */}
            {title}
          </p>
          <p className={styles.cardLocation}>
            {/* 12 Thorakolayaya, Middeniya Road */}
            {location}
          </p>
        </div>
        <div className={styles.featuresBlock}>
          <div className={styles.featuresItem}>
            <Size />
            <p className={styles.featuresTitle}>Size</p>
            <p className={styles.featuresDesc}>{sizeInMeters} m2</p>
          </div>
          <div className={styles.featuresItem}>
            <Bedrooms />
            <p className={styles.featuresTitle}>Bedrooms</p>
            <p className={styles.featuresDesc}>{numberBedrooms}</p>
          </div>
          <div className={styles.featuresItem}>
            <Type />
            <p className={styles.featuresTitle}>Type</p>
            <p className={styles.featuresDesc}>{typeOfObject}</p>
          </div>
        </div>
        <div className={styles.showAll}>
          <a href="">Show all rentals</a>
        </div>
      </div>
    </Link>
  );
};
