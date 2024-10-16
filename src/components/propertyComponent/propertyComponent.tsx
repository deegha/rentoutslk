'use client';
import React, { useState, useEffect } from 'react';
import { PropertyFixedBlock } from '../propertyFixedBlock';
import { TourRequestForm } from '../tourRequestForm';

interface PropertyComponentProps {
  propertyId: string;
  ownerId: string;
}

export const PropertyComponent: React.FC<PropertyComponentProps> = ({
  propertyId,
  ownerId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div>
      <PropertyFixedBlock setIsModalOpen={setIsModalOpen} />
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
          />
        </div>
      )}
    </div>
  );
};
