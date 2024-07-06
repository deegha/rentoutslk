import React from 'react';

import styles from './lookingForProperty.module.scss';
import { Button } from '../button';

export const LookingForProperty = () => {
  return (
    <section className={styles.container}>
      <p className={styles.text}>Looking for apartment in Colombo?</p>
      <Button
        text="Search"
        bgColor="#222222"
        textColor="#FFFFFF"
        padding="14.5px 28px"
        fontWeight="600"
      />
    </section>
  );
};
