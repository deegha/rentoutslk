'use client';
import React from 'react';
import styles from './myFavouriteCard.module.scss';
import Image from 'next/image';
import { CardFavourite } from '@/components';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Size from '@/icons/size.svg';
import Bedrooms from '@/icons/bedrooms.svg';
import Type from '@/icons/type.svg';
import Arrow from '@/icons/arrow_next.svg';

interface FavouriteCardProps {
  active: boolean;
  status: string;
  id: string;
  address: string;
  city: string;
  availableFrom?: string;
  deposit?: number;
  floorArea: number;
  propertyType: string;
  monthlyRent: number;
  title: string;
  images: string[];
  numberBedrooms: number;
  numberBathrooms: number;
  createdAt: { seconds: number; nanoseconds: number };
}

interface FavouriteCardProp {
  listing: FavouriteCardProps;
  onRemove: (_id: string) => void;
}

export const MyFavouriteCard: React.FC<FavouriteCardProp> = ({
  listing,
  onRemove,
}) => {
  const {
    address,
    id,
    title,
    city,
    propertyType,
    monthlyRent,
    floorArea,
    numberBedrooms,
    images,
    active,
    status,
  } = listing;

  const PrevArrow = (
    <div className="prevArrowBlock">
      <Arrow className="prevArrow" />
    </div>
  );

  const NextArrow = (
    <div className="nextArrowBlock">
      <Arrow />
    </div>
  );

  const customIndicators = () => <span className="pagination"></span>;

  const isUnavailable = !active || status === 'not verified';

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/favourite-properties/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        onRemove(id);
      } else {
        console.error('Failed to remove property from favourites');
      }
    } catch (error) {
      console.error('Error removing favourite:', error);
    }
  };

  return (
    <div className={styles.cardBlock}>
      {isUnavailable && <div className={styles.unavailableOverlay}></div>}
      <div className={styles.cardImageBlock}>
        {isUnavailable && (
          <div className={styles.unavailableBlock}>
            <p>This property is unavailable</p>
          </div>
        )}
        <CardFavourite isDelete id={id} onDelete={handleDelete} />
        <Slide
          transitionDuration={500}
          canSwipe={true}
          autoplay={false}
          defaultIndex={0}
          pauseOnHover={false}
          indicators={customIndicators}
          prevArrow={PrevArrow}
          nextArrow={NextArrow}
        >
          {images.map((image, index) => (
            <div key={index} className={styles.imageWrapper}>
              <Image
                src={image}
                layout="contain"
                width={412}
                height={320}
                alt={`Apartment image ${index + 1}`}
                className={styles.cardImage}
              />
            </div>
          ))}
        </Slide>
      </div>
      <div className={styles.cardDetailsBlock}>
        <a href={`/property/${id}`} className={styles.cardDescBlock}>
          <p className={styles.cardPrice}>{monthlyRent} Re</p>
          <p className={styles.cardTitle}>
            {title} in {city}
          </p>
          <p className={styles.cardLocation}>{address}</p>
        </a>
        <a href={`/property/${id}`} className={styles.featuresBlock}>
          <div className={styles.featuresItem}>
            <Size />
            <p className={styles.featuresTitle}>Size</p>
            <p className={styles.featuresDesc}>{floorArea} m2</p>
          </div>
          <div className={styles.featuresItem}>
            <Bedrooms />
            <p className={styles.featuresTitle}>Bedrooms</p>
            <p className={styles.featuresDesc}>{numberBedrooms}</p>
          </div>
          <div className={styles.featuresItem}>
            <Type />
            <p className={styles.featuresTitle}>Type</p>
            <p className={styles.featuresDesc}>{propertyType}</p>
          </div>
        </a>
        <div className={styles.showAll}>
          <a href="/rentals" target="_blank">
            Show all rentals
          </a>
        </div>
      </div>
    </div>
  );
};
