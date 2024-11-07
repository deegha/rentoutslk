import React from 'react';
import styles from './ActionModal.module.scss';

interface ActionModalProps {
  title: string;
  message: string;
  onClose: () => void;
}

const ActionModal: React.FC<ActionModalProps> = ({
  title,
  message,
  onClose,
}) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
};

export default ActionModal;
