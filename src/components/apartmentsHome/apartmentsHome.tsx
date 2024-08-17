'use client';
import React, { useState, useEffect } from 'react';
import styles from './apartmentsHome.module.scss';
import { ApartmentsList } from '@/components';
import BeatLoader from 'react-spinners/BeatLoader';

const getInitialCardCount = (width: number) => {
  if (width >= 1920) return 4;
  if (width >= 1440) return 3;
  if (width > 812) return 4;
  return 3;
};

interface Apartment {
  id: string;
  address: string;
  availableFrom: string;
  deposit: number;
  floorArea: number;
  propertyType: string;
  monthlyRent: number;
  title: string;
  image1: string;
  image2: string;
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

export const ApartmentsHome = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [cardCount, setCardCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setCardCount(getInitialCardCount(window.innerWidth));
    };

    if (typeof window !== 'undefined') {
      setCardCount(getInitialCardCount(window.innerWidth));
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  useEffect(() => {
    async function fetchListings() {
      try {
        setLoading(true);
        const response = await fetch('/api/trending-rentals');
        if (!response.ok) {
          throw new Error(`Failed to fetch listings: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('API Response Data:', data);

        const filteredData = data
          .filter(
            (item: Apartment) =>
              item.status === 'verified' && item.active === true,
          )
          .sort((a: Apartment, b: Apartment) => b.views - a.views);

        console.log('Filtered Data:', filteredData);

        setApartments(filteredData);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, []);

  const handleShowMore = () => {
    if (typeof window !== 'undefined') {
      setCardCount((prevCount) =>
        prevCount !== null
          ? prevCount + getInitialCardCount(window.innerWidth)
          : getInitialCardCount(window.innerWidth),
      );
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.titleBlock}>
        <h2 className={styles.title}>Apartments for you</h2>
        <p className={styles.subtitle}>
          These properties are trending. Find a place, contact owner, book a
          tour.
        </p>
      </div>
      {loading ? (
        <div className={styles.loader}>
          <BeatLoader color="#DE225C" />
        </div>
      ) : (
        <ApartmentsList
          apartments={apartments}
          cardCount={cardCount || 0}
          showBestOffer={true}
          buttonText="Show more"
          buttonTextColor="#222222"
          buttonFontWeight="600"
          buttonPadding="14.5px 20px"
          buttonBorderRadius="4px"
          buttonBgColor="#ffffff"
          buttonBorderColor="#222222"
          onShowMore={handleShowMore}
        />
      )}
    </section>
  );
};
