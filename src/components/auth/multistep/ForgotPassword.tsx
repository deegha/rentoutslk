'use client';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { PasswordExistFormValues, NewUserFormValues } from './types';
import styles from './multistep-form.module.scss';
import Warning from '@/icons/Circle_Warning.svg';
import Close from '@/icons/Close_MD.svg';
import { requestPasswordReset } from '@/firebase/requestPasswordReset';

interface ForgotPasswordProps {
  email: string;
  onSubmit: (_data: PasswordExistFormValues | NewUserFormValues) => void;
  onRequestClose: () => void;
  _onBack: () => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  email,
  // onSubmit,
  onRequestClose,
  _onBack,
}) => {
  const {
    register,
    // handleSubmit,
    formState: { errors },
  } = useFormContext<{ email: string }>();

  const handlePasswordReset = async () => {
    try {
      await requestPasswordReset(email);
      alert('Password reset link has been sent to your email');
      onRequestClose();
    } catch (error) {
      console.error('Error sending reset email:', error);
      alert('Failed to send reset link. Please try again later.');
    }
  };

  return (
    <form className={styles.container}>
      <div className={styles.header}>
        <div className={styles.closeIcone} onClick={onRequestClose}>
          <Close />
        </div>
        <h1 className={styles.title}>Reset your password</h1>
      </div>
      <div className={styles.login__container}>
        <div className={styles.containerEditEmail}>
          <p className={styles.emailPassword}>
            Please enter the email address to use to sign in to Rentouts
          </p>
        </div>
        <label className={styles.label}>Email Address</label>
        <input
          className={styles.input}
          placeholder="Enter your email"
          {...register('email')}
          type="email"
          defaultValue={email}
        />
        {errors.email && (
          <div className={styles.errorContainer}>
            <Warning />
            <p className={styles.errorPasswordMessage}>
              {errors.email?.message}
            </p>
          </div>
        )}
        <button
          type="button"
          onClick={handlePasswordReset}
          className={styles.button}
        >
          Set reset link
        </button>
      </div>
      <div className={styles.formTextContainer}>
        <p className={styles.formText}>
          By signing in or creating an account, you agree
          <br />
          with Rentout&apos;s{' '}
          <a className={styles.formLinks} href="">
            Terms of Service
          </a>{' '}
          and{' '}
          <a className={styles.formLinks} href="">
            Privacy Policy
          </a>
        </p>
      </div>
    </form>
  );
};
