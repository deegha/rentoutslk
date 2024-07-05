'use client';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { PasswordExistFormValues, NewUserFormValues } from './types';
import styles from './multistep-form.module.scss';
import Warning from '@/icons/Circle_Warning.svg';
import Close from 'icons/Close_MD.svg';

interface PasswordStepProps {
  emailExists: boolean;
  email: string;
  onSubmit: (data: PasswordExistFormValues | NewUserFormValues) => void;
  onRequestClose: () => void;
  onBack: () => void;
}

const PasswordStep: React.FC<PasswordStepProps> = ({
  emailExists,
  email,
  onSubmit,
  onRequestClose,
  onBack,
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
        <h1 className={styles.title}>Log in or Create your account</h1>
      </div>
      <div className={styles.login__container}>
        <div className={styles.containerEditEmail}>
          <p className={styles.emailPassword}>
            Please enter your password for{' '}
            <span className={styles.email}>{email}</span>{' '}
            <span className={styles.edit} onClick={onBack}>
              Edit?
            </span>
          </p>
        </div>
        <label>Password</label>
        <input
          className={styles.input}
          placeholder="Enter a password"
          {...register('password')}
          type="password"
        />
        {errors.password && (
          <div className={styles.errorContainer}>
            <Warning />
            <p className={styles.errorPasswordMessage}>
              {errors.password.message}
            </p>
          </div>
        )}
        {!emailExists && (
          <>
            <label>Confirm Password</label>
            <input
              className={styles.input}
              placeholder="Confirm your password"
              {...register('confirmPassword')}
              type="password"
            />
            {errors.confirmPassword && (
              <div className={styles.errorContainer}>
                <Warning />
                <p className={styles.errorPasswordMessage}>
                  {errors.confirmPassword.message}
                </p>
              </div>
            )}
          </>
        )}
        <button type="submit" className={styles.button}>
          {emailExists ? 'Log In' : 'Create Account'}
        </button>
      </div>
      <div className={styles.formTextContainer}>
        <a className={styles.formLinks} href="">
          Forgot your password?
        </a>
      </div>
    </form>
  );
};

export default PasswordStep;
