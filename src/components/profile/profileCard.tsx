'use client';
import { useSession, signOut } from 'next-auth/react';
import React, { useState } from 'react';
import { CustomSession, UserRent } from '@/interface/session';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import styles from './profileCard.module.scss';
import { Modal } from '@mui/material';
import BeatLoader from 'react-spinners/BeatLoader';

const UserSchema = z.object({
  email: z.string().email(),
  mobile: z.string().min(10, 'Mobile number must be at least 10 digits'),
});

const PasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type UserFormValues = z.infer<typeof UserSchema>;
type PasswordFormValues = z.infer<typeof PasswordSchema>;

export const ProfileCard = ({
  user,
  userId,
}: {
  user: UserRent;
  userId: string;
}) => {
  const { data: session, status } = useSession();
  const [isEditingMobile, setIsEditingMobile] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isDeleteAccount, setDeleteAccount] = useState(false);

  const mobileMethods = useForm<UserFormValues>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      email: user.email,
      mobile: user.mobile || '',
    },
  });

  const passwordMethods = useForm<PasswordFormValues>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  if (status === 'loading') {
    return (
      <div className={styles.loading}>
        <BeatLoader color="#DE225C" />
      </div>
    );
  }

  if (!session) {
    return <div>No session available</div>;
  }

  const customToken = (session as CustomSession)?.user?.customToken;

  const onSubmitMobile = async (data: UserFormValues) => {
    try {
      const response = await fetch('/api/profile/updateMobile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          mobile: data.mobile,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        console.log(result.message);
        setIsEditingMobile(false);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error updating mobile number:', error);
    }
  };

  const onSubmitPassword = async (data: PasswordFormValues) => {
    try {
      const response = await fetch('/api/profile/updatePassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
          customToken,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        console.log(result.message);
        setIsEditingPassword(false);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch('/api/profile/deleteAccount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          customToken,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        console.log(result.message);
        signOut();
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const handleOpenModal = () => {
    setDeleteAccount(true);
  };

  const handleCloseModal = () => {
    setDeleteAccount(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerProfile}>
        <div className={styles.cardHeader}>
          <h2 className={styles.titleHeader}>My Profile</h2>
        </div>
        <div className={`${styles.profileProperty} ${styles.emailProperty}`}>
          <p className={styles.title}>Email</p>
          <p>{user.email}</p>
        </div>
        <div
          className={`${isEditingMobile ? styles.profilePropertyActive : styles.profileProperty} ${styles.mobileProperty}`}
          style={{ height: isEditingMobile ? '275px' : '100px' }}
        >
          <div className={styles.profilePropertyContainer}>
            <div className={styles.inEditableContainer}>
              <p className={styles.title}>Mobile</p>
              <p className={styles.phoneMobile}>{user.mobile}</p>
            </div>
            <div className={styles.editableContainer}>
              <p className={styles.phone}>{user.mobile}</p>
              <div
                className={styles.editButton}
                onClick={() => setIsEditingMobile(!isEditingMobile)}
              >
                <span>Edit</span>
              </div>
            </div>
          </div>

          <FormProvider {...mobileMethods}>
            <form
              onSubmit={mobileMethods.handleSubmit(onSubmitMobile)}
              className={`${isEditingMobile ? styles.editForm : styles.opacityZero} `}
              style={{
                opacity: isEditingMobile ? '1' : '0',
                display: isEditingMobile ? 'flex' : 'none',
              }}
            >
              <p className={styles.editMobileTitle}>Enter new mobile number</p>
              <input
                id="mobile"
                {...mobileMethods.register('mobile')}
                className={styles.editInput}
                placeholder="Your mobile number"
              />
              <div className={styles.buttonGroup}>
                <button type="submit" className={styles.saveButton}>
                  Save changes
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
        <div
          className={`${isEditingPassword ? styles.profilePropertyActive : styles.profileProperty} ${styles.passwordProperty}`}
          style={{ height: isEditingPassword ? '325px' : '100px' }}
        >
          <div className={styles.profilePropertyContainer}>
            <div className={styles.mobilePropertyTitle}>
              <p className={styles.title}>Password</p>
              <p className={styles.passwordMobile}>
                The password is not displayed for security reasons
              </p>
            </div>
            <p className={styles.password}>
              The password is not displayed for security reasons
            </p>
            <div
              className={styles.editButton}
              onClick={() => setIsEditingPassword(!isEditingPassword)}
            >
              <span>Edit</span>
            </div>
          </div>

          <FormProvider {...passwordMethods}>
            <form
              onSubmit={passwordMethods.handleSubmit(onSubmitPassword)}
              className={`${isEditingPassword ? styles.editForm : styles.opacityZero} `}
              style={{
                opacity: isEditingPassword ? '1' : '0',
                display: isEditingPassword ? 'flex' : 'none',
              }}
            >
              <input
                id="currentPassword"
                type="password"
                placeholder="Your current password"
                {...passwordMethods.register('currentPassword')}
                className={styles.editInput}
              />

              <input
                id="newPassword"
                type="password"
                placeholder="New password"
                {...passwordMethods.register('newPassword')}
                className={styles.editInput}
              />

              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
                {...passwordMethods.register('confirmPassword')}
                className={styles.editInput}
              />

              <div className={styles.buttonGroup}>
                <button type="submit" className={styles.saveButton}>
                  Save changes
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
        <div
          className={`${styles.profileProperty} ${styles.deleteAccountProperty}`}
        >
          <p className={styles.title}>Delete account</p>
          <div className={styles.editableContainer}>
            <div className={styles.editButton} onClick={handleOpenModal}>
              <span>Delete account</span>
            </div>
          </div>
        </div>
        <Modal
          open={isDeleteAccount}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className={styles.modal}>
            <h2 id="modal-modal-title" className={styles.modalTitle}>
              Delete Account
            </h2>
            <p id="modal-modal-description" className={styles.modalDesc}>
              Are you sure you want to delete your account?
            </p>
            <div>
              <span className={styles.modalEmail}>{user.email}</span>
            </div>
            <form
              className={styles.modalForm}
              onSubmit={(e) => {
                e.preventDefault();
                handleDeleteAccount();
              }}
            >
              <div className={styles.modalCheck}>
                <input type="checkbox" />
                <span className={styles.checkText}>
                  {' '}
                  I understand that I won&apos;t be able to recover my account.
                </span>
              </div>
              <div className={styles.buttonGroup}>
                <button className={styles.deleteButton} type="submit">
                  Request
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className={styles.cancleButton}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};
