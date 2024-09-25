'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface FavouriteContextProps {
  favouriteCount: number | null;
  setFavouriteCount: (_count: number | null) => void;
  fetchFavouriteCount: () => void;
}

const FavouriteContext = createContext<FavouriteContextProps>({
  favouriteCount: null,
  setFavouriteCount: () => {},
  fetchFavouriteCount: () => {},
});

export const useFavourite = () => useContext(FavouriteContext);

export const FavouriteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favouriteCount, setFavouriteCount] = useState<number | null>(null);

  const fetchFavouriteCount = async () => {
    try {
      const res = await fetch('/api/favourite-properties/favourite-count');
      if (res.ok) {
        const data = await res.json();
        setFavouriteCount(data.count);
      } else {
        setFavouriteCount(null);
      }
    } catch (error) {
      console.error('Error fetching favourite count:', error);
      setFavouriteCount(null);
    }
  };

  useEffect(() => {
    fetchFavouriteCount();
  }, []);

  return (
    <FavouriteContext.Provider
      value={{ favouriteCount, setFavouriteCount, fetchFavouriteCount }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};
