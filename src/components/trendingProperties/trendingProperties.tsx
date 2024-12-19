'use client';
import React, { useState, useEffect } from 'react';
import styles from './trendingProperties.module.scss';
import { ApartmentsList } from '@/components';
import BeatLoader from 'react-spinners/BeatLoader';

interface Apartment {
  id: string;
  address: string;
  title: string;
  city: string;
  availableFrom: string;
  deposit: number;
  floorArea: number;
  propertyType: string;
  monthlyRent: number;
  images: string[];
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

interface TrendingPropertiesProps {
  address: string;
  city: string;
}

const getInitialCardCount = (width: number) => {
  if (width >= 1600) return 4;
  if (width >= 1280) return 3;
  if (width > 812) return 4;
  return 3;
};

export const TrendingProperties: React.FC<TrendingPropertiesProps> = ({
  address,
  city,
}) => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [cardCount, setCardCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrendingListings() {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/trending-rentals-area?address=${encodeURIComponent(address)}&city=${encodeURIComponent(city)}`,
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch trending listings: ${response.statusText}`,
          );
        }
        const data = await response.json();

        const filteredData = data
          .filter(
            (item: Apartment) =>
              item.status === 'approved' &&
              (item.address.toLowerCase().includes(address.toLowerCase()) ||
                item.city.toLowerCase().includes(city.toLowerCase())),
          )
          .sort((a: Apartment, b: Apartment) => b.views - a.views);

        setApartments(filteredData);
      } catch (error) {
        console.error('Error fetching trending listings:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTrendingListings();
  }, [address, city]);

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
      <div className={styles.block}>
        <h3 className={styles.title}>Trending properties in this area</h3>
        {loading ? (
          <div className={styles.loader}>
            <BeatLoader color="#DE225C" />
          </div>
        ) : (
          <ApartmentsList
            cardCount={cardCount || 0}
            apartments={apartments}
            showBestOffer={false}
            buttonText="Show more"
            buttonTextColor="#222222"
            buttonFontWeight="600"
            buttonPadding="14.5px 20px"
            buttonBorderRadius="4px"
            buttonBgColor="#f7f7f7"
            buttonBorderColor="#222222"
            onShowMore={handleShowMore}
          />
        )}
      </div>
    </section>
  );
};
