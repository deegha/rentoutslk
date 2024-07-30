'use client';
import React, { ReactNode } from 'react';
import styles from '../signAuth.module.scss';
import { signIn } from 'next-auth/react';

export const SignButtonOAuth = ({
  method,
  icon,
  label,
  className,
}: {
  method: string;
  icon: ReactNode;
  label: string;
  className?: string;
}) => {
  return (
    <form
    // action={async () => {
    //   'use server';
    //   await signIn(`${method}`);
    // }}
    >
      <div
        className={styles.button__container__icon}
        onClick={() => signIn(`${method}`)}
      >
        <div className={styles.icon__container}>{icon}</div>
        <button
          className={`${styles.button__OAuth} ${className}`}
          type="button"
        >
          {label}
        </button>
      </div>
    </form>
  );
};
