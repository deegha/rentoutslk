'use client';
import React from 'react';
import styles from './heroBanner.module.scss';
import Neighbourhood from '@/icons/neighbourhood.svg';

interface DropdownProps {
  searchQuery: string;
  searchResults: string[];
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
  return (
    <div
      className={`${styles.dropdown} ${
        isVisible ? styles.dropdownVisible : ''
      }`}
    >
      {searchResults.length > 0 ? (
        <>
          <p className={styles.dropdownTitle}>Neighbourhood, address</p>
          {searchResults.map((address, index) => (
            <div
              key={index}
              className={styles.dropdownItem}
              onClick={() => onItemClick(address)}
            >
              <Neighbourhood />
              <p>{highlightMatch(address, searchQuery)}</p>
            </div>
          ))}
        </>
      ) : (
        <div className={styles.noResults}>No results found</div>
      )}
    </div>
  );
};
