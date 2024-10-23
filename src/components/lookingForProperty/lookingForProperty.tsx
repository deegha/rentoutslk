'use client';
import React from 'react';
import styles from './lookingForProperty.module.scss';
import { Button } from '../button';
import { useSearchContext } from '@/context/searchProvider/searchProvider';
import { useRouter } from 'next/navigation';

interface LookingForPropertyProps {
  city?: string;
}

export const LookingForProperty: React.FC<LookingForPropertyProps> = ({
  city = 'Colombo',
}) => {
  const { setSearchQuery: setGlobalSearchQuery } = useSearchContext();
  const router = useRouter();

  const handleSearchClick = () => {
    if (city && city.trim()) {
      setGlobalSearchQuery(city);
      router.push(`/rentals?combined=${encodeURIComponent(city)}`);
    } else {
      console.error('City is not defined or empty');
    }
  };

  return (
    <section className={styles.container}>
      <p className={styles.text}>Looking for apartment in {city}?</p>
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
