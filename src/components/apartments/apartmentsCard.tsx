'use client';
import React from 'react';
import Image from 'next/image';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import styles from './apartmentsCard.module.scss';

import Size from '@/icons/size.svg';
import Bedrooms from '@/icons/bedrooms.svg';
import Type from '@/icons/type.svg';
import Fav from '@/icons/heart_gray.svg';
import Arrow from '@/icons/arrow_next.svg';

export const ApartmentsCard = () => {
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

  const customIndicators = <span className="pagination"></span>;

  return (
    <div className={styles.cardBlock}>
      <div className={styles.cardImageBlock}>
        <div className={styles.bestOffer}>
          <p>Best offer</p>
        </div>
        <div className={styles.fav}>
          <Fav />
        </div>
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
          <Image
            src="/images/apartments_card.png"
            width={412}
            height={216}
            alt="Apartments"
          />
          <Image
            src="/images/apartments_card.png"
            width={412}
            height={216}
            alt="Apartments"
          />
          <Image
            src="/images/apartments_card.png"
            width={412}
            height={216}
            alt="Apartments"
          />
          <Image
            src="/images/apartments_card.png"
            width={412}
            height={216}
            alt="Apartments"
          />
          <Image
            src="/images/apartments_card.png"
            width={412}
            height={216}
            alt="Apartments"
          />
        </Slide>
      </div>
      <div className={styles.cardDetailsBlock}>
        <div className={styles.cardDescBlock}>
          <a href="/" className={styles.cardPrice}>
            54 244 Re
          </a>
          <a href="/" className={styles.cardTitle}>
            Sunny Deck Neightbourhood in Colombo South-East
          </a>
          <p className={styles.cardLocation}>
            12 Thorakolayaya, Middeniya Road
          </p>
        </div>
        <div className={styles.featuresBlock}>
          <div className={styles.featuresItem}>
            <Size />
            <p className={styles.featuresTitle}>Size</p>
            <p className={styles.featuresDesc}>65 m2</p>
          </div>
          <div className={styles.featuresItem}>
            <Bedrooms />
            <p className={styles.featuresTitle}>Bedrooms</p>
            <p className={styles.featuresDesc}>3</p>
          </div>
          <div className={styles.featuresItem}>
            <Type />
            <p className={styles.featuresTitle}>Type</p>
            <p className={styles.featuresDesc}>Apartment</p>
          </div>
        </div>
        <div className={styles.showAll}>
          <a href="">Show all rentals</a>
        </div>
      </div>
    </div>
  );
};
