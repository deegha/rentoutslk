import React from 'react';
import styles from './DeleteConfirmationModal.module.scss';

interface DeleteConfirmationModalProps {
  onClose: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  onClose,
}) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <p>Request Deleted</p>
        <p className={styles.undo} onClick={onClose}>
          Undo
        </p>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
