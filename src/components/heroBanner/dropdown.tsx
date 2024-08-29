'use client';
import React from 'react';
import styles from './heroBanner.module.scss';
import Neighbourhood from '@/icons/neighbourhood.svg';
import Place from '@/icons/place.svg';

interface SearchResult {
  address: string;
  place: string;
}

interface DropdownProps {
  searchQuery: string;
  searchResults: SearchResult[];
  onItemClick: (_value: string) => void;
  isVisible: boolean;
}

const highlightMatch = (text: string, query: string) => {
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, index) => (
    <React.Fragment key={index}>
      <span
        style={{
          color: part.toLowerCase() === query.toLowerCase() ? '#5E5E5E' : '',
        }}
      >
        {part}
      </span>
    </React.Fragment>
  ));
};

export const Dropdown: React.FC<DropdownProps> = ({
  searchQuery,
  searchResults,
  onItemClick,
  isVisible,
}) => {
  const filteredResults = searchResults.filter(
    (result) => result.place || result.address,
  );
  const hasPlaces = filteredResults.some((result) => result.place);
  const hasNeighbourhoods = filteredResults.some((result) => result.address);

  return (
    <div
      className={`${styles.dropdown} ${
        isVisible ? styles.dropdownVisible : ''
      }`}
    >
      {hasPlaces && (
        <>
          <p className={styles.dropdownTitle}>Places</p>
          {filteredResults
            .filter((result) => result.place)
            .map((result, index) => (
              <div
                key={`place-${index}`}
                className={styles.dropdownItem}
                onClick={() => onItemClick(result.place)}
              >
                <Place />
                <p>{highlightMatch(result.place, searchQuery)}</p>
              </div>
            ))}
        </>
      )}
      {hasNeighbourhoods && (
        <>
          <p className={styles.dropdownTitle}>Neighbourhood</p>
          {filteredResults
            .filter((result) => result.address)
            .map((result, index) => (
              <div
                key={`address-${index}`}
                className={styles.dropdownItem}
                onClick={() => onItemClick(result.address)}
              >
                <Neighbourhood />
                <p>{highlightMatch(result.address, searchQuery)}</p>
              </div>
            ))}
        </>
      )}
      {filteredResults.length === 0 && (
        <div className={styles.noResults}>No results found</div>
      )}
    </div>
  );
};
