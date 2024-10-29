import React from 'react';
import styles from './tourRequestStatusChip.module.scss';

interface TourRequestStatusChipProps {
  status: 'pending' | 'accepted' | 'declined' | 'deleted';
}

export const TourRequestStatusChip: React.FC<TourRequestStatusChipProps> = ({
  status,
}) => {
  let statusText = '';
  let statusClass = '';

  switch (status) {
    case 'pending':
      statusText = 'Pending';
      statusClass = styles.pending;
      break;
    case 'accepted':
      statusText = 'Accepted';
      statusClass = styles.accepted;
      break;
    case 'declined':
      statusText = 'Declined';
      statusClass = styles.declined;
      break;
    case 'deleted':
      statusText = 'Deleted from listing';
      statusClass = styles.deleted;
      break;
    default:
      statusText = 'Unknown';
      statusClass = styles.unknown;
      break;
  }

  return (
    <div className={`${styles.chipBlock} ${statusClass}`}>
      <p>{statusText}</p>
    </div>
  );
};
