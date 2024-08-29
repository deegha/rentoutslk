'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextProps {
  searchQuery: string;
  // eslint-disable-next-line no-unused-vars
  setSearchQuery: (query: string) => void; // Disable warning for this line
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};
