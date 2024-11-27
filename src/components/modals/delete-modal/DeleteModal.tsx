import React from 'react';
import styles from './DeleteModal.module.scss';
import { Button } from '@/components';
import BeatLoader from 'react-spinners/BeatLoader';
import CloseIcon from '@/icons/close.svg';

interface DeleteModalProps {
  handleDelete: () => void;
  onClose: () => void;
  loading: boolean;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  handleDelete,
  onClose,
  loading,
}) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.closeButton} onClick={onClose}>
          <CloseIcon />
        </div>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            Are you sure you want to delete the listing?
          </h2>
        </div>
        <div className={styles.modalBlock}>
          {loading ? (
            <div className={styles.loaderBlock}>
              <BeatLoader color="#DE225C" />
            </div>
          ) : (
            <div className={styles.modalActionsBlock}>
              <Button
                text="Delete"
                bgColor="#222222"
                textColor="#fff"
                padding="10.5px 39px"
                borderRadius="4px"
                fontWeight="600"
                onClick={handleDelete}
              />
              <Button
                text="Cancel"
                bgColor="#fff"
                textColor="#000"
                borderColor="#222222"
                padding="10.5px 39px"
                borderRadius="4px"
                fontWeight="600"
                onClick={onClose}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
