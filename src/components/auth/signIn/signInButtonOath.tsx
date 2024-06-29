'use client';
import { signIn } from 'next-auth/react';
import React from 'react';

export const SignInButtonOath = ({
  children,
  methodAuth,
  className,
  email,
}: {
  children: string;
  methodAuth?: string;
  className?: string;
  email?: string;
}) => {
  return (
    <button
      className={className}
      onClick={() => signIn(`${methodAuth}`, { email })}
    >
      {children}
    </button>
  );
};
