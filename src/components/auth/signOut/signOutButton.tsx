'use client';
import { signOut } from '@/auth';
import React from 'react';

export const SignOutButton = () => {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button>Log Out</button>
    </form>
  );
};
