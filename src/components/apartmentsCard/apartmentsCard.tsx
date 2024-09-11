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
  place: string;
  availableFrom?: string;
  deposit?: number;
  floorArea: number;
  propertyType: string;
  monthlyRent: number;
  title: string;
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
  image5?: string;
  image6?: string;
  image7?: string;
  image8?: string;
  image9?: string;
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
    place,
    propertyType,
    monthlyRent,
    floorArea,
    numberBedrooms,
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
  } = listing;

  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
  ].filter(
    (img): img is string => typeof img === 'string' && img.trim() !== '',
  );

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
          {images.map((image, index) => (
            <div key={index}>
              <Image
                src={image}
                width={412}
                height={216}
                alt={`Apartment image ${index + 1}`}
              />
            </div>
          ))}
        </Slide>
      </div>
      <div className={styles.cardDetailsBlock}>
        <a href={`/property/${id}`} className={styles.cardDescBlock}>
          <p className={styles.cardPrice}>{monthlyRent} Re</p>
          <p className={styles.cardTitle}>
            {title} in {place}
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
