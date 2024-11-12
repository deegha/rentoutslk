import React from 'react';
import styles from './myListCardStatusChip.module.scss';

interface MyListCardStatusChipProps {
  status: string | null | undefined;
}

export const MyListCardStatusChip: React.FC<MyListCardStatusChipProps> = ({
  status,
}) => {
  let statusText = '';
  let statusClass = '';

  switch (status) {
    case 'created':
      statusText = 'Pending approval';
      statusClass = styles.created;
      break;

    case 'approved':
      statusText = 'Approved';
      statusClass = styles.approved;
      break;

    case 'inactive':
      statusText = 'Inactive';
      statusClass = styles.inactive;
      break;
  }

  return (
    <div className={`${styles.chipBlock} ${statusClass}`}>
      <p>{statusText}</p>
    </div>
  );
};
