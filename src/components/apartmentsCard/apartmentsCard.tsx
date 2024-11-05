import React from 'react';
import Image from 'next/image';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import styles from './apartmentsCard.module.scss';

import Size from '@/icons/size.svg';
import Bedrooms from '@/icons/bedrooms.svg';
import Type from '@/icons/type.svg';
import { CardFavourite } from '@/components';
import Arrow from '@/icons/arrow_next.svg';

interface ApartmentsCardProps {
  id: string;
  address: string;
  city: string;
  availableFrom?: string;
  deposit?: number;
  floorArea: number;
  propertyType: string;
  monthlyRent: number;
  title: string;
  images: string[]; // Массив изображений
  numberBedrooms: number;
  numberBathrooms: number;
  createdAt: string;
}

interface ApartmentsCardProp {
  showBestOffer: boolean;
  listing: ApartmentsCardProps;
}

export const ApartmentsCard: React.FC<ApartmentsCardProp> = ({
  showBestOffer,
  listing,
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

  return (
    <div className={styles.cardBlock}>
      <div className={styles.cardImageBlock}>
        {showBestOffer && (
          <div className={styles.bestOffer}>
            <p>Best offer</p>
          </div>
        )}
        <CardFavourite id={id} />
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
          {images && images.length > 0 ? (
            images.map((image, index) => (
              <div key={index}>
                <Image
                  src={image}
                  width={412}
                  height={216}
                  alt={`Apartment image ${index + 1}`}
                />
              </div>
            ))
          ) : (
            <div>No images available</div>
          )}
        </Slide>
      </div>
      <div className={styles.cardDetailsBlock}>
        <a href={`/property/${id}`} className={styles.cardDescBlock}>
          <p className={styles.cardPrice}>{monthlyRent} LKR</p>
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
