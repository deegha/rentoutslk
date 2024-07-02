'use client';
import React from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './apartmentsCard.module.scss';

import Size from '@/icons/size.svg';
import Bedrooms from '@/icons/bedrooms.svg';
import Type from '@/icons/type.svg';

const CustomNavigation = () => {
  const swiper = useSwiper();

  return (
    <div className={styles.customNavigation}>
      <button onClick={() => swiper.slidePrev()} className={styles.navButton}>
        Prev
      </button>
      <button onClick={() => swiper.slideNext()} className={styles.navButton}>
        Next
      </button>
    </div>
  );
};

export const ApartmentsCard = () => {
  return (
    <div className={styles.cardBlock}>
      <div className={styles.cardImageBlock}>
        <div className={styles.bestOffer}>
          <p>Best offer</p>
        </div>
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          loop
          navigation
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
        >
          <CustomNavigation />
          <SwiperSlide>
            <img src="/images/apartments_card.png" alt="Apartment Image 1" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/images/apartments_card.png" alt="Apartment Image 2" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/images/apartments_card.png" alt="Apartment Image 3" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className={styles.cardDetailsBlock}>
        <div className={styles.cardDescBlock}>
          <p className={styles.cardPrice}>54 244 Re</p>
          <p className={styles.cardTitle}>
            Sunny Deck Neightbourhood in Colombo South-East
          </p>
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
