'use client';

import React, { useEffect, useState } from 'react';
import { MyListCard } from './myListCard';
import styles from './checkListings.module.scss';
import { PropertyProps } from '@/interface/property';
import BeatLoader from 'react-spinners/BeatLoader';
import { CustomSelect } from '@/components';

interface CheckListingsProps {
  _userData: any;
  idToken: string;
}

interface OptionType {
  value: string;
  label: string;
}

type ActiveLink = 'All listings' | 'Active' | 'Inactive';

const listingOptions = [
  { value: 'All listings', label: 'All listings' },
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
];

const CheckListings: React.FC<CheckListingsProps> = ({
  _userData,
  idToken,
}) => {
  const [listingsState, setListingsState] = useState<PropertyProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeLink, setActiveLink] = useState<ActiveLink>('All listings');

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
        const response = await fetch(`${baseUrl}/api/check-listings`, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch listings');
        }

        const data = await response.json();
        setListingsState(data.listings || []);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [idToken]);

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

  const handleSelectChange = (option: OptionType | null) => {
    setActiveLink(option ? (option.value as ActiveLink) : 'All listings');
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
          {listingsState.length > 0 && (
            <>
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
              <div className={styles.typeOfListingsMobile}>
                <CustomSelect
                  control={undefined}
                  option={listingOptions}
                  name="filter"
                  onChange={handleSelectChange}
                  errors={{}}
                  isDefaultOption={true}
                />
              </div>
            </>
          )}
        </div>
        <div>
          {loading ? (
            <div style={{ textAlign: 'center', marginTop: '25vh' }}>
              <BeatLoader color="#DE225C" />
            </div>
          ) : filteredListings && filteredListings.length > 0 ? (
            filteredListings.map((listing, index) => (
              <MyListCard
                key={index}
                listing={listing}
                idToken={idToken}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
                isInactive={!listing.active}
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
