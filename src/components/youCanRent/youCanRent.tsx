import React from 'react';
import Image from 'next/image';

import styles from './youCanRent.module.scss';
import { Button } from '../button';

export const YouCanRent = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>
        You can rent out your property in 3 simple steps
      </h2>
      <div className={styles.cardBlock}>
        <div className={styles.cardItem}>
          <Image
            src="/images/allRentals/basic_info.png"
            alt="Add basic info"
            width={70}
            height={70}
          />
          <div className={styles.cardText}>
            <h3 className={styles.cardTitle}>Step 1: Add basic info </h3>
            <p className={styles.cardDesc}>
              You don`t have to write anything – just select from the options we
              offer.
            </p>
          </div>
        </div>
        <div className={styles.cardItem}>
          <Image
            src="/images/allRentals/add_images.png"
            alt="Add images"
            width={70}
            height={70}
          />
          <div className={styles.cardText}>
            <h3 className={styles.cardTitle}>Step 2: Add images</h3>
            <p className={styles.cardDesc}>
              One can not underestimate the power of visuals. We`ve made adding
              images as easy as possible.
            </p>
          </div>
        </div>
        <div className={styles.cardItem}>
          <Image
            src="/images/allRentals/questions.png"
            alt="Ask your questions"
            width={70}
            height={70}
          />
          <div className={styles.cardText}>
            <h3 className={styles.cardTitle}>Step 3: Ask your questions </h3>
            <p className={styles.cardDesc}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
              velit eu purus tincidunt gravida nec non ipsum.
            </p>
          </div>
        </div>
      </div>
      <Button
        text="Create listing for free"
        textColor="#FFFFFF"
        bgColor="#222222"
        fontWeight="600"
        padding="14.5px 28px"
        borderRadius="4px"
        link="/add-your-apartment"
      />
    </section>
  );
};
