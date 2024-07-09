'use client';
import React from 'react';
import Image from 'next/image';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { DescriptionItem } from './descriptionItem';

import styles from './propertyDetails.module.scss';

import Arrow from '@/icons/arrow_next.svg';
import Heart from '@/icons/heart_gray_property.svg';
import Share from '@/icons/share.svg';
import Verified from '@/icons/verified.svg';

export const PropertyDetails = () => {
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
    <section className={styles.container}>
      <div className={styles.propertyBlock}>
        <div className={styles.detailsBlock}>
          <div className={styles.imgBlock}>
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
                src="/images/propertyPage/propertyImg.png"
                layout="fill"
                objectFit="cover"
                alt="Apartments"
              />
              <Image
                src="/images/propertyPage/propertyImg.png"
                layout="fill"
                objectFit="cover"
                alt="Apartments"
              />
              <Image
                src="/images/propertyPage/propertyImg.png"
                layout="fill"
                objectFit="cover"
                alt="Apartments"
              />
              <Image
                src="/images/propertyPage/propertyImg.png"
                layout="fill"
                objectFit="cover"
                alt="Apartments"
              />
              <Image
                src="/images/propertyPage/propertyImg.png"
                layout="fill"
                objectFit="cover"
                alt="Apartments"
              />
            </Slide>
          </div>
          <div className={styles.textBlock}>
            <div className={styles.titleBlock}>
              <h1 className={styles.title}>
                Rent 3 bedroom apartment in Sunny Neighbourhood of 65 m2 in
                Colombo
              </h1>
              <p className={styles.subtitle}>
                12 Thorakolayaya, Middeniya Road
              </p>
            </div>
            <div className={styles.btnBlock}>
              <a href="" className={styles.btn}>
                <Heart />
              </a>
              <a href="" className={styles.btn}>
                <Share />
              </a>
            </div>
            <ul className={styles.descList}>
              <DescriptionItem name="Price:" value="54 244 Re/mo" />
              <DescriptionItem name="Size:" value="65 m2" />
              <DescriptionItem name="Available from:" value="Now" />
              <DescriptionItem name="Property type:" value="Apartment" />
              <DescriptionItem name="Bedrooms:" value="3  bedrooms" />
              <DescriptionItem name="Bathrooms:" value="1 bathroom" />
              <DescriptionItem name="Furnished:" value="Yes" />
              <DescriptionItem
                name="Verified by Rentouts:"
                value={<Verified />}
              />
            </ul>
          </div>
        </div>
        <div className={styles.mapBlock}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4716.148121078742!2d80.86475347010926!3d6.291039922933511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae6ababfdfb95eb%3A0x9a48abdc3be10a2e!2zTWlkZGVuaXlhIFJkLCBFbWJpbGlwaXRpeWEsINCo0YDQuC3Qm9Cw0L3QutCw!5e0!3m2!1sru!2sua!4v1720551106085!5m2!1sru!2sua"
            width="100%"
            height="280"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};
