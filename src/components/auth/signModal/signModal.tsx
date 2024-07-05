'use client';
import React, { useState } from 'react';
import { Button } from '@/components/button';
import styles from '../signAuth.module.scss';
import { signOut } from 'next-auth/react';
import MultiStepForm from '../multistep/multistep-form';
import Link from 'next/link';
import { Session as AuthSession, User as AuthUser } from '@auth/core/types';

interface User extends AuthUser {
  id: string;
  email: string;
}

interface Session extends AuthSession {
  user: User;
}

export const SignModal = ({ session }: { session: Session | null }) => {
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
            onClick={() => openModal()}
          />
          <MultiStepForm isOpen={isModalOpen} onRequestClose={closeModal} />
        </>
      )}
    </div>
  );
};
