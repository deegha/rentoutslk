'use client';
import React from 'react';
import styles from './apartmentsList.module.scss';
import { ApartmentsCard } from '@/components';
import { Button } from '../button';

interface Apartment {
  id: string;
  address: string;
  availableFrom: string;
  deposit: number;
  floorArea: number;
  propertyType: string;
  monthlyRent: number;
  title: string;
  place: string;
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
  image5?: string;
  image6?: string;
  image7?: string;
  image8?: string;
  image9?: string;
  numberBedrooms: number;
  numberBathrooms: number;
  furnishing: string;
  createdAt: string;
  views: number;
  parking?: boolean;
  pool?: boolean;
  hotWater?: boolean;
  tv?: boolean;
  gym?: boolean;
  electricCharger?: boolean;
  status?: string;
  active?: boolean;
}

interface ApartmentsListProps {
  apartments?: Apartment[];
  cardCount: number;
  showBestOffer: boolean;
  buttonText: string;
  buttonTextColor: string;
  buttonFontWeight: string;
  buttonPadding: string;
  buttonBorderRadius: string;
  buttonBgColor: string;
  buttonBorderColor: string;
  onShowMore?: () => void;
}

export const ApartmentsList: React.FC<ApartmentsListProps> = ({
  apartments = [],
  cardCount,
  showBestOffer,
  buttonText,
  buttonTextColor,
  buttonFontWeight,
  buttonPadding,
  buttonBorderRadius,
  buttonBgColor,
  buttonBorderColor,
  onShowMore,
}) => {
  if (cardCount === null) {
    return <p>Loading...</p>;
  }

  const cards = apartments
    .slice(0, cardCount)
    .map((listing) => (
      <ApartmentsCard
        listing={listing}
        key={listing.id}
        showBestOffer={showBestOffer}
      />
    ));
  return (
    <div className={styles.container}>
      <div className={styles.list}>{cards}</div>
      {apartments.length > 4 && cardCount < apartments.length && (
        <div className={styles.btnBlock}>
          <Button
            text={buttonText}
            textColor={buttonTextColor}
            fontWeight={buttonFontWeight}
            padding={buttonPadding}
            borderRadius={buttonBorderRadius}
            bgColor={buttonBgColor}
            borderColor={buttonBorderColor}
            onClick={onShowMore}
          />
        </div>
      )}
    </div>
  );
};
