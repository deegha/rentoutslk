'use client';
import React, { useState } from 'react';
import styles from './favouriteListings.module.scss';
import { MyFavouriteCard } from '../myFavouriteCard/myFavouriteCard';
import { PropertyProps } from '@/interface/property';

interface FavouriteListingsProps {
  listings: PropertyProps[];
}

const FavouriteListings: React.FC<FavouriteListingsProps> = ({ listings }) => {
  const [savedListings, setSavedListings] = useState(listings);

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
        <div className={styles.favouriteList}>
          {savedListings.length > 0 ? (
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
