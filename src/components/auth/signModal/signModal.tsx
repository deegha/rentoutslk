'use client';
import React, { useState } from 'react';
import { Button } from '@/components/button';
import styles from '../signAuth.module.scss';
import { signOut, useSession } from 'next-auth/react';
import MultiStepForm from '../multistep/multistep-form';
import Link from 'next/link';

export const SignModal = () => {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {session ? (
        <div className={styles.authorized}>
          <div>
            <Link href={'/profile'} className={styles.link}>
              <span>Profile</span>
            </Link>
          </div>
          <Button
            text="Sign Out"
            bgColor="#000"
            textColor="#fff"
            padding="10px"
            borderRadius="4px"
            fontWeight="600"
            onClick={() => signOut()}
          />
        </div>
      ) : (
        <>
          <Button
            text="Sign In"
            bgColor="#000"
            textColor="#fff"
            padding="10px"
            borderRadius="4px"
            fontWeight="600"
            onClick={openModal}
          />
          <MultiStepForm isOpen={isModalOpen} onRequestClose={closeModal} />
        </>
      )}
    </div>
  );
};
