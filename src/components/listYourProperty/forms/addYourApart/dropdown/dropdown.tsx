import React, { ReactNode, useState } from 'react';
import styles from './dropdown.module.scss';

import Arrow from '@/icons/arrow_dropdown.svg';

interface DropdownProps {
  title: string;
  desc: ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({ title, desc }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.dropdown} onClick={toggleDropdown}>
      <div className={`${styles.arrow} ${isOpen ? styles.open : ''}`}>
        <Arrow />
      </div>
      <div className={styles.dropdownTextBlock}>
        <h5 className={styles.dropdownTitle}>{title}</h5>
        <div
          className={`${styles.dropdownDesc} ${isOpen ? styles.show : styles.hide}`}
        >
          {desc}
        </div>
      </div>
    </div>
  );
};
