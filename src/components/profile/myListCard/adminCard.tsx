'use client';
import React, { useState } from 'react';
import styles from './adminCard.module.scss';
import Image from 'next/image';
// import ApproveIcon from '@/icons/approve.svg';
// import RejectIcon from '@/icons/reject.svg';
import Delete from '@/icons/profile/Trash_Full.svg';
import ArrowLink from '@/icons/arrowLink.svg';
import Link from 'next/link';
import { PropertyProps } from '@/interface/property';
import { formatDate } from '@/utils/formateData';

interface AdminCardProps {
  listing: PropertyProps;
  idToken: string;
  onDelete: (_id: string) => void;
}

export const AdminCard: React.FC<AdminCardProps> = ({
  listing,
  idToken,
  onDelete,
}) => {
  const { title, createdAt, views, favorite, id } = listing;

  const [isRejected, setIsRejected] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  const handleApprove = async () => {
    try {
      const response = await fetch('/api/check-listings/verify-action', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ listingId: id, status: 'verify' }),
      });

      if (response.ok) {
        setIsApproved(true);
        alert('Listing approved successfully');
      } else {
        console.error('Failed to approve listing');
      }
    } catch (error) {
      console.error('Error approving listing:', error);
    }
  };

  const handleReject = async () => {
    const reason = prompt('Please provide a reason for rejection:');
    if (!reason) return;

    try {
      const response = await fetch('/api/check-listings/verify-action', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ listingId: id, status: 'reject', reason }),
      });

      if (response.ok) {
        setIsRejected(true);
        alert('Listing rejected successfully');
      } else {
        console.error('Failed to reject listing');
      }
    } catch (error) {
      console.error('Error rejecting listing:', error);
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
        body: JSON.stringify({ listingId: id }),
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
    <div className={styles.mainContainer}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src={'/images/apartments_card.png'}
          alt={title}
          width={1920}
          height={1080}
        />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.infoContainer}>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>{title}</h1>
            <Link href={`/property/${id}`}>
              <ArrowLink />
            </Link>
          </div>
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
          {!isApproved && !isRejected && (
            <>
              <div className={styles.editItem} onClick={handleApprove}>
                {/* <ApproveIcon /> */}
                <p>Approve</p>
              </div>
              <div className={styles.editItem} onClick={handleReject}>
                {/* <RejectIcon /> */}
                <p>Reject</p>
              </div>
            </>
          )}
          <div className={styles.editItem} onClick={deleteListing}>
            <Delete />
            <p>Delete</p>
          </div>
        </div>
      </div>
    </div>
  );
};
