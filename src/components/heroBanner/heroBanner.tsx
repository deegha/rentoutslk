'use client';
import React, { useState } from 'react';
import { Button } from '@/components';
import { Dropdown } from './dropdown';

import styles from './heroBanner.module.scss';

import ArrowRight from '@/icons/arrow_right_outline.svg';

const placesData = ['Colombo', 'Kandy', 'Galle'];
const addressesData = ['Colombian Road', 'Kandy Street', 'Galle Avenue'];

export const HeroBanner = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{
    places: string[];
    addresses: string[];
  }>({ places: [], addresses: [] });
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      setSearchResults({
        places: placesData.filter((place) =>
          place.toLowerCase().includes(query.toLowerCase()),
        ),
        addresses: addressesData.filter((address) =>
          address.toLowerCase().includes(query.toLowerCase()),
        ),
      });
      setIsDropdownVisible(true);
    } else {
      setSearchResults({ places: [], addresses: [] });
      setIsDropdownVisible(false);
    }
  };

  const handleItemClick = (value: string) => {
    setSearchQuery(value);
    setSearchResults({ places: [], addresses: [] });
    setIsDropdownVisible(false);
  };

  return (
    <section className={styles.container}>
      <div className={styles.heroBlock}>
        <h1>Find your perfect apartment in Sri Lanka</h1>
        <div className={styles.searchContainer}>
          <div className={styles.searchBlock}>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="City, Neighbourhood"
              value={searchQuery}
              onChange={handleInputChange}
            />
            <Button
              text="SEARCH"
              link="/"
              bgColor="#DE225C"
              textColor="#FFFFFF"
              padding="20px"
              fontWeight="600"
            />
          </div>
          <Dropdown
            searchQuery={searchQuery}
            searchResults={searchResults}
            onItemClick={handleItemClick}
            isVisible={isDropdownVisible}
          />
        </div>
        <a className={styles.linkBlock}>
          <p>See all rentals</p>
          <ArrowRight />
        </a>
      </div>
    </section>
  );
};
