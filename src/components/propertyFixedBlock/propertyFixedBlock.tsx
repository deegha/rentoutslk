'use client';
import React from 'react';
import { Button } from '@/components';

import styles from './propertyFixedBlock.module.scss';

interface PropertyFixedProps {
  setIsModalOpen: (_value: boolean) => void;
}

export const PropertyFixedBlock: React.FC<PropertyFixedProps> = ({
  setIsModalOpen,
}) => {
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={styles.fixedBlock}>
      <div className={styles.fixedContainer}>
        <div className={styles.fixedTitleBlock}>
          <p className={styles.fixedTitle}>
            Rent 3 bedroom apartment in Sunny Neighbourhood of 100 sq ft in
            Colombo
          </p>
        </div>
        <div className={styles.priceBlock}>
          <p className={styles.price}>54 244 LKR</p>
          <Button
            text="Request a tour"
            textColor="#FFFFFF"
            bgColor="#222222"
            padding="14.5px 28px"
            borderRadius="4px"
            fontWeight="600"
            onClick={handleOpenModal}
          />
        </div>
      </div>
    </div>
  );
};
