'use client';
import React, { useEffect, useState } from 'react';
import styles from './myListCard.module.scss';
import Image from 'next/image';
import Edit from '@/icons/profile/edit.svg';
import Delete from '@/icons/profile/Trash_Full.svg';
import Left from '@/icons/profile/Swicht_Left.svg';
import { PropertyProps } from '@/interface/property';
import ArrowLink from '@/icons/arrowLink.svg';
import Link from 'next/link';
import { formatDate } from '@/utils/formateData';

interface MyListCardProp {
  listing: PropertyProps;
  idToken: string;
  onDelete: (_id: string) => void;
  onStatusChange: (_id: string, _newActiveStatus: boolean) => void;
  isInactive: boolean;
}

export const MyListCard: React.FC<MyListCardProp> = ({
  listing,
  idToken,
  onDelete,
  onStatusChange,
  isInactive,
}) => {
  const { title, place, image1, createdAt, views, active, id, userId } =
    listing;
  const [isActive, setIsActive] = useState(active);
  const [savedUsersCount, setSavedUsersCount] = useState(0);

  useEffect(() => {
    const fetchSavedUsersCount = async () => {
      try {
        const response = await fetch(
          `/api/check-listings/saved-users-count?id=${id}`,
        );
        const data = await response.json();
        setSavedUsersCount(data.savedUsersCount);
      } catch (error) {
        console.error('Error fetching saved users count:', error);
      }
    };

    fetchSavedUsersCount();
  }, [id]);

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
        onStatusChange(id, data.newActiveStatus);
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
        onDelete(id);
      } else {
        console.error('Failed to delete listing');
      }
    } catch (error) {
      console.error('Error deleting listing:', error);
    }
  };

  const formattedDate = formatDate(createdAt);

  return (
    <div
      className={`${styles.mainContainer} ${isInactive ? styles.inActiveContainer : ''}`}
    >
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src={`${image1}`}
          alt={title}
          width={1920}
          height={1080}
        />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.infoContainer}>
          <div className={styles.titleContainer}>
            <div className={styles.titleLeftContainer}>
              <h1 className={styles.title}>
                {title} in {place}
              </h1>
              <Link href={`/property/${id}`}>
                <ArrowLink />
              </Link>
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.infoBlock}>
              <h4 className={styles.infoTitle}>Views</h4>
              <p className={styles.infoValue}>{views}</p>
            </div>
            <div className={styles.infoBlock}>
              <h4 className={styles.infoTitle}>Favourites</h4>
              <p className={styles.infoValue}>{savedUsersCount}</p>
            </div>
            <div className={styles.infoBlock}>
              <h4 className={styles.infoTitle}>Created</h4>
              <p className={styles.infoValue}>{formattedDate}</p>
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
