'use client';
import React, { useState, useEffect, useRef } from 'react';
import { PropertyFixedBlock } from '../propertyFixedBlock';
import { TourRequestForm } from '../tourRequestForm';
import { PropertyProps } from '@/interface/property';
import styles from '../propertyFixedBlock/propertyFixedBlock.module.scss';

interface PropertyComponentProps {
  property: PropertyProps;
  propertyId: string;
  ownerId: string;
}

export const PropertyComponent: React.FC<PropertyComponentProps> = ({
  property,
  propertyId,
  ownerId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isModalOpen]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container} ref={targetRef}>
      <PropertyFixedBlock
        property={property}
        setIsModalOpen={setIsModalOpen}
        targetRef={targetRef}
      />
      {isModalOpen && (
        <div
          style={{
            width: '100%',
            height: '100vh',
            position: 'absolute',
            zIndex: 30,
            top: 0,
            left: 0,
            overflow: 'hidden',
          }}
        >
          <TourRequestForm
            handleCloseModal={handleCloseModal}
            propertyId={propertyId}
            ownerId={ownerId}
            property={property}
          />
        </div>
      )}
    </div>
  );
};
