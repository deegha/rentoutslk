'use client';
import React, { useState, useEffect } from 'react';
import FavGray from '@/icons/heart_gray.svg';
import FavBlack from '@/icons/heart_black.svg';
import DeleteIcon from '@/icons/delete.svg';
import { useFavourite } from '@/context/favouriteProvider/favouriteProvider';
import { useSession } from 'next-auth/react';
import MultiStepForm from '@/components/auth/multistep/multistep-form';
import styles from './cardFavourite.module.scss';

interface FavouriteProps {
  id: string;
  isDelete?: boolean;
  onDelete?: () => Promise<void>;
}

export const CardFavourite: React.FC<FavouriteProps> = ({
  id,
  isDelete,
  onDelete,
}) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const [loading, setLoading] = useState(true);
  const { fetchFavouriteCount } = useFavourite();
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const checkIfFavourite = async () => {
      try {
        const res = await fetch(`/api/favourite-properties/${id}`);
        if (res.ok) {
          const data = await res.json();
          setIsFavourite(data.isFavourite);
        }
      } finally {
        setLoading(false);
      }
    };

    checkIfFavourite();
  }, [id]);

  const handleFavouriteClick = async () => {
    if (!session) {
      setIsModalOpen(true);
      return;
    }

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
      if (res.ok) {
        fetchFavouriteCount();
      } else {
        setIsFavourite(isFavourite);
      }
    } catch {
      setIsFavourite(isFavourite);
    }
  };

  const handleDeleteClick = async () => {
    if (onDelete) {
      await onDelete();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className={styles.fav}>
        {isDelete ? <DeleteIcon /> : <FavGray />}
      </div>
    );
  }

  return (
    <>
      <div
        className={styles.fav}
        onClick={isDelete ? handleDeleteClick : handleFavouriteClick}
      >
        {isDelete ? <DeleteIcon /> : isFavourite ? <FavBlack /> : <FavGray />}
      </div>
      <MultiStepForm isOpen={isModalOpen} onRequestClose={closeModal} />
    </>
  );
};
