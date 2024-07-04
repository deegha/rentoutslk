import React from 'react';

import styles from './apartmentsList.module.scss';

import { ApartmentsCard } from './apartmentsCard';

interface ApartmentsListProps {
  showBestOffer: boolean;
  cardCount: number;
}

export const ApartmentsList: React.FC<ApartmentsListProps> = ({
  showBestOffer,
  cardCount,
}) => {
  const cards = Array.from({ length: cardCount }, (_, index) => (
    <ApartmentsCard key={index} showBestOffer={showBestOffer} />
  ));

  return <div className={styles.list}>{cards}</div>;
};
