'use client';
import React, { useState } from 'react';
import styles from './myListCard.module.scss';
import Image from 'next/image';
import Edit from '@/icons/profile/edit.svg';
import Delete from '@/icons/profile/Trash_Full.svg';
import Left from '@/icons/profile/Swicht_Left.svg';
import { PropertyProps } from '@/interface/property';
import ArrowLink from '@/icons/arrowLink.svg';
import Link from 'next/link';
import { formatDate } from '@/utils/formateData';
import { MyListCardStatusChip } from '@/components/profile/myListCard/myListCardStatusChip';
import { useRouter } from 'next/navigation';
import { DeleteModal } from '@/components/modals';

interface MyListCardProp {
  listing: PropertyProps;
  idToken: string;
  onDelete: (_id: string) => void;
  onStatusChange: (_id: string, _newStatus: string) => void;
}

export const MyListCard: React.FC<MyListCardProp> = ({
  listing,
  idToken,
  onDelete,
  onStatusChange,
}) => {
  const router = useRouter();

  const { title, city, images, createdAt, views, id, userId, status } = listing;
  const [savedUsersCount, setSavedUsersCount] = React.useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId: id }),
      });

      if (response.ok) {
        const data = await response.json();
        onStatusChange(id, data.newStatus);
      } else {
        console.error('Failed to update listing status');
      }
    } catch (error) {
      console.error('Error updating listing status:', error);
    }
  };

  const deleteListing = async () => {
    setLoading(true);
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
        setIsModalOpen(false);
      } else {
        console.error('Failed to delete listing');
      }
    } catch (error) {
      console.error('Error deleting listing:', error);
    } finally {
      setLoading(false);
    }
  };

  const formattedDate = formatDate(createdAt);

  return (
    <div
      className={`${styles.mainContainer} ${status === 'inactive' ? styles.inActiveContainer : ''}`}
    >
      <div className={styles.imageContainer}>
        {images.length > 0 ? (
          <Image
            className={styles.image}
            src={images[0]}
            alt={title}
            width={1920}
            height={1080}
          />
        ) : (
          <p>No image available</p>
        )}
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.infoContainer}>
          <div className={styles.titleContainer}>
            <Link
              href={`/property/${id}`}
              target="_blank"
              className={styles.titleLeftContainer}
            >
              <h1 className={styles.title}>
                {title} in {city}
              </h1>
              <ArrowLink />
            </Link>
            <MyListCardStatusChip status={status} />
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
          <div
            className={styles.editItem}
            onClick={() => router.push(`/add-your-apartment?propertyId=${id}`)}
          >
            <Edit />
            <p>Edit</p>
          </div>
          <div className={styles.editItem} onClick={() => setIsModalOpen(true)}>
            <Delete />
            <p>Delete</p>
          </div>
          <div className={styles.editItem} onClick={toggleActiveStatus}>
            <Left />
            <p>
              {status === 'inactive' ? 'Enable listing' : 'Disable listing'}
            </p>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <DeleteModal
          handleDelete={deleteListing}
          onClose={() => setIsModalOpen(false)}
          loading={loading}
        />
      )}
    </div>
  );
};
