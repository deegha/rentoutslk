'use client';
import React from 'react';
import styles from './lookingForProperty.module.scss';
import { Button } from '../button';
import { useSearchContext } from '@/context/searchProvider/searchProvider';
import { useRouter } from 'next/navigation';

interface LookingForPropertyProps {
  place?: string;
}

export const LookingForProperty: React.FC<LookingForPropertyProps> = ({
  place = 'Colombo',
}) => {
  const { setSearchQuery: setGlobalSearchQuery } = useSearchContext();
  const router = useRouter();

  const handleSearchClick = () => {
    if (place && place.trim()) {
      setGlobalSearchQuery(place);
      router.push(`/rentals?combined=${encodeURIComponent(place)}`);
    } else {
      console.error('Place is not defined or empty');
    }
  };

  return (
    <section className={styles.container}>
      <p className={styles.text}>Looking for apartment in {place}?</p>
      <Button
        text="Search"
        bgColor="#222222"
        textColor="#FFFFFF"
        padding="14.5px 28px"
        fontWeight="600"
        onClick={handleSearchClick}
      />
    </section>
  );
};
