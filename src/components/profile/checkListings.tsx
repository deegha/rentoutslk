'use client';

import React, { useState } from 'react';
import { MyListCard } from './myListCard';
import styles from './checkListings.module.scss';
import { PropertyProps } from '@/interface/property';

interface CheckListingsProps {
  listings: PropertyProps[];
  idToken: string;
}

type ActiveLink = 'All listings' | 'Active' | 'Inactive';

const CheckListings: React.FC<CheckListingsProps> = ({ listings, idToken }) => {
  const [listingsState, setListingsState] = useState(listings);
  const [activeLink, setActiveLink] = useState<ActiveLink>('All listings');

  const handleDelete = (id: string) => {
    setListingsState((prevListings) =>
      prevListings.filter((listing) => listing.id !== id),
    );
  };

  const handleStatusChange = (id: string, newActiveStatus: boolean) => {
    setListingsState((prevListings) =>
      prevListings.map((listing) =>
        listing.id === id ? { ...listing, active: newActiveStatus } : listing,
      ),
    );
  };

  const filteredListings = listingsState.filter((listing) => {
    if (activeLink === 'Active') return listing.active === true;
    if (activeLink === 'Inactive') return listing.active === false;
    return true;
  });

  return (
    <div className={styles.container}>
      <div className={styles.containerProfile}>
        <div className={styles.cardHeader}>
          <h2 className={styles.titleHeader}>My Listings</h2>
          {listingsState && listingsState.length > 0 && (
            <div className={styles.typeOfListings}>
              <p
                className={`${activeLink === 'All listings' ? styles.activeLink : styles.link}`}
                onClick={() => setActiveLink('All listings')}
              >
                All listings
              </p>
              <p
                className={`${activeLink === 'Active' ? styles.activeLink : styles.link}`}
                onClick={() => setActiveLink('Active')}
              >
                Active
              </p>
              <p
                className={`${activeLink === 'Inactive' ? styles.activeLink : styles.link}`}
                onClick={() => setActiveLink('Inactive')}
              >
                Inactive
              </p>
            </div>
          )}
        </div>
        <div>
          {filteredListings && filteredListings.length > 0 ? (
            filteredListings.map((listing, index) => (
              <MyListCard
                key={index}
                listing={listing}
                idToken={idToken}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))
          ) : (
            <div className={styles.empty}>
              <a href="/add-your-apartment" className={styles.emptyText}>
                You don&apos;t have listings
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckListings;
