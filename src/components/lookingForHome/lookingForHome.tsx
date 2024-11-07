import React from 'react';
import Image from 'next/image';

import styles from './lookingForHome.module.scss';
import { Button } from '../button';

export const LookingFor = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>
        Are you looking for a rental in Sri Lanka?
      </h2>
      <div className={styles.cardBlock}>
        <div className={styles.cardItem}>
          <Image
            src="/images/home/verif.png"
            alt="verif"
            width={70}
            height={70}
          />
          <div className={styles.cardText}>
            <h3 className={styles.cardTitle}>
              Only verified apartment owners{' '}
            </h3>
            <p className={styles.cardDesc}>
              Browse through listings from verified apartment owners. Every
              property is checked to ensure you have a safe and reliable rental
              experience.
            </p>
          </div>
        </div>
        <div className={styles.cardItem}>
          <Image src="/images/home/fav.png" alt="fav" width={70} height={70} />
          <div className={styles.cardText}>
            <h3 className={styles.cardTitle}>
              Make your own list of favourites
            </h3>
            <p className={styles.cardDesc}>
              Save your top picks to a personalized favorites list. This way,
              you can easily revisit and compare options to find the perfect
              place.
            </p>
          </div>
        </div>
        <div className={styles.cardItem}>
          <Image
            src="/images/home/comm.png"
            alt="comm"
            width={70}
            height={70}
          />
          <div className={styles.cardText}>
            <h3 className={styles.cardTitle}>Quick contact</h3>
            <p className={styles.cardDesc}>
              Connect directly with property owners to ask any questions. Get
              quick and reliable responses to help you make informed decisions
              effortlessly.
            </p>
          </div>
        </div>
      </div>
      <Button
        text="Find rental"
        textColor="#FFFFFF"
        bgColor="#222222"
        fontWeight="600"
        padding="14.5px 28px"
        borderRadius="4px"
        link="/rentals"
      />
    </section>
  );
};
