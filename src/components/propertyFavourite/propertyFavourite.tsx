'use client';
import React, { useState, useEffect } from 'react';
import Fav from '@/icons/heart_gray_property.svg';
import FavBlack from '@/icons/heart_black_property.svg';

interface FavouriteProps {
  id: string;
}

export const PropertyFavourite: React.FC<FavouriteProps> = ({ id }) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkIfFavourite = async () => {
      try {
        const res = await fetch(`/api/favourite-properties/${id}`);
        if (res.ok) {
          const data = await res.json();
          setIsFavourite(data.isFavourite);
        }
      } catch (error) {
        console.error('Error fetching favourite status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkIfFavourite();
  }, [id]);

  const handleFavouriteClick = async () => {
    setIsFavourite(!isFavourite);

    try {
      const action = isFavourite ? 'remove' : 'add';
      const res = await fetch('/api/favourite-properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, action }),
      });
      if (!res.ok) {
        setIsFavourite(isFavourite);
        console.error('Failed to update favourite status');
      }
    } catch (error) {
      setIsFavourite(isFavourite);
      console.error('Error updating favourite:', error);
    }
  };

  if (loading) {
    return <Fav />;
  }

  return (
    <div onClick={handleFavouriteClick}>
      {isFavourite ? <FavBlack /> : <Fav />}
    </div>
  );
};
