'use client';
import { signOut } from 'next-auth/react';
import React from 'react';

export const SignOutButton = () => {
  return <a onClick={() => signOut()}>Sign Out</a>;
};
