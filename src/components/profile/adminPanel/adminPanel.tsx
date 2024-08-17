'use client';

import React, { useState } from 'react';
import styles from './adminPanel.module.scss';
import { PropertyProps } from '@/interface/property';
import { AdminCard } from '../myListCard/adminCard';

interface AdminPanelProps {
  listings: PropertyProps[];
  idToken: string;
}

type ActiveLink = 'All listings' | 'Approved' | 'Rejected';

export const AdminPanel: React.FC<AdminPanelProps> = ({
  listings,
  idToken,
}) => {
  const [listingsState, setListingsState] = useState(listings);
  const [activeLink, setActiveLink] = useState<ActiveLink>('All listings');

  const handleDelete = (id: string) => {
    setListingsState((prevListings) =>
      prevListings.filter((listing) => listing.id !== id),
    );
  };

  const filteredListings = listingsState.filter((listing) => {
    if (activeLink === 'Approved') return listing.status === 'verified';
    if (activeLink === 'Rejected') return listing.status === 'rejected';
    return true; // For 'All listings'
  });

  return (
    <div className={styles.container}>
      <div className={styles.containerProfile}>
        <div className={styles.cardHeader}>
          <h2 className={styles.titleHeader}>Admin Panel</h2>
          {listingsState && listingsState.length > 0 && (
            <div className={styles.typeOfListings}>
              <p
                className={`${activeLink === 'All listings' ? styles.activeLink : styles.link}`}
                onClick={() => setActiveLink('All listings')}
              >
                All listings
              </p>
              <p
                className={`${activeLink === 'Approved' ? styles.activeLink : styles.link}`}
                onClick={() => setActiveLink('Approved')}
              >
                Approved
              </p>
              <p
                className={`${activeLink === 'Rejected' ? styles.activeLink : styles.link}`}
                onClick={() => setActiveLink('Rejected')}
              >
                Rejected
              </p>
            </div>
          )}
        </div>
        <div>
          {filteredListings && filteredListings.length > 0 ? (
            filteredListings.map((listing, index) => (
              <AdminCard
                key={index}
                listing={listing}
                idToken={idToken}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <div className={styles.empty}>
              <a href="/add-your-apartment" className={styles.emptyText}>
                No listings found
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
