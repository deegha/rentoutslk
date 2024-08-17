'use client';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { PasswordExistFormValues, NewUserFormValues } from './types';
import styles from './multistep-form.module.scss';
import Warning from '@/icons/Circle_Warning.svg';
import Close from '@/icons/Close_MD.svg';

interface ForgotPasswordProps {
  email: string;
  onSubmit: (_data: PasswordExistFormValues | NewUserFormValues) => void;
  onRequestClose: () => void;
  _onBack: () => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  email,
  onSubmit,
  onRequestClose,
  _onBack,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<PasswordExistFormValues | NewUserFormValues>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <div className={styles.header}>
        <div className={styles.closeIcone} onClick={onRequestClose}>
          <Close />
        </div>
        <h1 className={styles.title}>Reset your password</h1>
      </div>
      <div className={styles.login__container}>
        <div className={styles.containerEditEmail}>
          <p className={styles.emailPassword}>
            Resetting password for <span className={styles.email}>{email}</span>
          </p>
        </div>
        <label>New Password</label>
        <input
          className={styles.input}
          placeholder="Enter a new password"
          {...register('password')}
          type="password"
        />
        {errors.password && (
          <div className={styles.errorContainer}>
            <Warning />
            <p className={styles.errorPasswordMessage}>
              {errors.password?.message}
            </p>
          </div>
        )}
        <label>Confirm New Password</label>
        <input
          className={styles.input}
          placeholder="Confirm your new password"
          {...register('confirmPassword')}
          type="password"
        />
        {errors.confirmPassword && (
          <div className={styles.errorContainer}>
            <Warning />
            <p className={styles.errorPasswordMessage}>
              {errors.confirmPassword?.message}
            </p>
          </div>
        )}
        <button type="submit" className={styles.button}>
          Reset Password
        </button>
      </div>
    </form>
  );
};
