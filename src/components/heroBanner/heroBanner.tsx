'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components';
import { Dropdown } from './dropdown';
import { useSearchContext } from '@/context/searchProvider/searchProvider';

import styles from './heroBanner.module.scss';

import ArrowRight from '@/icons/arrow_right_outline.svg';

type SearchResult = {
  address: string;
  place: string;
};

export const HeroBanner = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { setSearchQuery: setGlobalSearchQuery } = useSearchContext();

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim().length === 0) {
        setSearchResults([]);
        setIsDropdownVisible(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/rental-search?query=${encodeURIComponent(searchQuery.toLowerCase())}`,
        );
        const data: { results: SearchResult[] } = await response.json();

        setSearchResults(data.results || []);
        setIsDropdownVisible(true);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setSearchResults([]);
        setIsDropdownVisible(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleItemClick = (value: string) => {
    setSearchQuery(value);
    setSearchResults([]);
    setIsDropdownVisible(false);
  };

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      setGlobalSearchQuery(searchQuery);
      router.push(`/rentals?combined=${encodeURIComponent(searchQuery)}`);
    }
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
              onFocus={() => setIsDropdownVisible(true)}
            />
            <Button
              text="SEARCH"
              onClick={handleSearchClick}
              bgColor="#DE225C"
              textColor="#FFFFFF"
              padding="20px"
              fontWeight="600"
            />
          </div>
          <div ref={dropdownRef}>
            <Dropdown
              searchQuery={searchQuery}
              searchResults={searchResults}
              onItemClick={handleItemClick}
              isVisible={isDropdownVisible}
            />
          </div>
        </div>
        <a href="/rentals" className={styles.linkBlock}>
          <p>See all rentals</p>
          <ArrowRight />
        </a>
      </div>
    </section>
  );
};
