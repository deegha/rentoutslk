'use client';
import React, { useState, useEffect } from 'react';
import styles from './favouriteListings.module.scss';
import { MyFavouriteCard } from '../myFavouriteCard/myFavouriteCard';
import { PropertyProps } from '@/interface/property';
import BeatLoader from 'react-spinners/BeatLoader';

interface FavouriteListingsProps {
  idToken: string;
}

const FavouriteListings: React.FC<FavouriteListingsProps> = ({ idToken }) => {
  const [savedListings, setSavedListings] = useState<PropertyProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedListings = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL;

        const response = await fetch(
          `${baseUrl}/api/favourite-properties/profile`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error('Failed to fetch saved listings');
        }

        const data = await response.json();
        setSavedListings(data.savedProperties || []);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedListings();
  }, [idToken]);

  const handleRemoveListing = (id: string) => {
    setSavedListings((prevListings) =>
      prevListings.filter((listing) => listing.id !== id),
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerProfile}>
        <div className={styles.cardHeader}>
          <h2 className={styles.titleHeader}>My Favourites</h2>
        </div>
        <div
          className={`${styles.favouriteList} ${loading ? styles.loading : ''}`}
        >
          {loading ? (
            <div className={styles.loaderContainer}>
              <BeatLoader color="#DE225C" />
            </div>
          ) : savedListings.length > 0 ? (
            savedListings.map((listing) => (
              <MyFavouriteCard
                key={listing.id}
                listing={listing}
                onRemove={handleRemoveListing}
              />
            ))
          ) : (
            <p>You have no saved listings yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavouriteListings;
