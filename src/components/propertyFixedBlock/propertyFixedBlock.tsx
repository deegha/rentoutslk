'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components';
import { PropertyProps } from '@/interface/property';
import styles from './propertyFixedBlock.module.scss';

interface PropertyFixedProps {
  property: PropertyProps;
  setIsModalOpen: (_value: boolean) => void;
  targetRef: React.RefObject<HTMLElement | null>;
}

export const PropertyFixedBlock: React.FC<PropertyFixedProps> = ({
  setIsModalOpen,
  property,
  targetRef,
}) => {
  const { monthlyRent } = property;
  const [isFixed, setIsFixed] = useState(true);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!targetRef?.current) return;

      const targetTop = targetRef.current.getBoundingClientRect().bottom;
      const viewportHeight = window.innerHeight;

      if (targetTop <= viewportHeight) {
        setIsFixed(false);
      } else {
        setIsFixed(true);
      }
    };

    const handleScrollOptimized = () => {
      window.requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', handleScrollOptimized);
    return () => {
      window.removeEventListener('scroll', handleScrollOptimized);
    };
  }, [targetRef]);

  return (
    <div className={isFixed ? styles.fixedBlock : styles.relativeBlock}>
      <div className={styles.fixedContainer}>
        <div className={styles.fixedTitleBlock}>
          <p className={styles.fixedTitle}>
            Rent 3 bedroom apartment in Sunny Neighbourhood of 100 sq ft in
            Colombo
          </p>
        </div>
        <div className={styles.priceBlock}>
          <p className={styles.price}>
            {monthlyRent.toLocaleString('en-US')} LKR
          </p>
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
