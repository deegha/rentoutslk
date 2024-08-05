'use client';
import React, { useState } from 'react';
import styles from './myListCard.module.scss';
import Image from 'next/image';
import Edit from '@/icons/profile/edit.svg';
import Delete from '@/icons/profile/Trash_Full.svg';
import Left from '@/icons/profile/Swicht_Left.svg';
import { PropertyProps } from '@/interface/property';

interface MyListCardProp {
  listing: PropertyProps;
  idToken: string;
  onDelete: (_id: string) => void;
}

export const MyListCard: React.FC<MyListCardProp> = ({
  listing,
  idToken,
  onDelete,
}) => {
  const {
    // address,
    // availableFrom,
    title,
    // propertyType,
    // monthlyRent,
    // image1,
    // floorArea,
    // numberBedrooms,
    createdAt,
    views,
    favorite,
    active,
    id,
    userId,
  } = listing;
  const [isActive, setIsActive] = useState(active);

  const toggleActiveStatus = async () => {
    try {
      const response = await fetch('/api/check-listings/toggle-listing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ listingId: id }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsActive(data.newActiveStatus);
      } else {
        console.error('Failed to update listing status');
      }
    } catch (error) {
      console.error('Error updating listing status:', error);
    }
  };

  const deleteListing = async () => {
    try {
      const response = await fetch('/api/check-listings/delete-listing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ listingId: id, userId }),
      });

      if (response.ok) {
        // Notify parent component about deletion
        onDelete(id);
      } else {
        console.error('Failed to delete listing');
      }
    } catch (error) {
      console.error('Error deleting listing:', error);
    }
  };

  const formatDate = (timestamp: { seconds: number; nanoseconds: number }) => {
    const date = new Date(timestamp.seconds * 1000);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const formattedDate = formatDate(createdAt);

  return (
    <div
      className={`${styles.mainContainer} ${!isActive && styles.inActiveContainer}`}
    >
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src={'/images/apartments_card.png'}
          alt={''}
          width={1920}
          height={1080}
        />
      </div>
      <div className={`${styles.contentContainer} `}>
        <div className={styles.infoContainer}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.info}>
            <div>
              <h4>Views</h4>
              <p>{views}</p>
            </div>
            <div>
              <h4>Favourites</h4>
              <p>{favorite}</p>
            </div>
            <div>
              <h4>Created</h4>
              <p>{formattedDate}</p>
            </div>
          </div>
        </div>
        <div className={styles.actionContainer}>
          <div className={styles.editItem}>
            <Edit />
            <p>Edit</p>
          </div>
          <div className={styles.editItem} onClick={deleteListing}>
            <Delete />
            <p>Delete</p>
          </div>
          <div className={styles.editItem} onClick={toggleActiveStatus}>
            <Left />
            <p>{isActive ? 'Disable listing' : 'Enable listing'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
