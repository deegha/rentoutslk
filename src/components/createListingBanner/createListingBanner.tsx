'use client';
import React, { useState } from 'react';
import styles from './createListingBanner.module.scss';
import { Button } from '../button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import MultiStepForm from '../auth/multistep/multistep-form';

export const CreateListingBanner = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleListPropertyClick = () => {
    if (session) {
      router.push('/add-your-apartment');
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className={styles.container}>
      <div className={styles.bannerBlock}>
        <div className={styles.titleBlock}>
          <h2 className={styles.title}>
            Would you like to rent out your property?
          </h2>
          <p className={styles.description}>
            Create a tee listing in 3 simple steps and get contacted by
            interested tenants.{' '}
          </p>
        </div>
        <Button
          text="Create listing for free"
          onClick={handleListPropertyClick}
          bgColor="#222222"
          textColor="#FFFFFF"
          padding="14.5px 28px"
          fontWeight="700"
        />
      </div>
      <MultiStepForm isOpen={isModalOpen} onRequestClose={closeModal} />
    </section>
  );
};
