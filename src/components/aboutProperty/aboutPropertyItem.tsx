'use client';
import React from 'react';
import styles from './aboutProperty.module.scss';

interface AboutPropertyItemProps {
  name: string;
  value: string | number;
}

export const AboutPropertyItem: React.FC<AboutPropertyItemProps> = ({
  name,
  value,
}) => {
  return (
    <>
      <div className={styles.item}>
        <p className={styles.itemName}>{name}</p>
        <p className={styles.itemValue}>{value}</p>
      </div>
    </>
  );
};
