import type { NextAuthConfig } from 'next-auth';
import { FirestoreAdapter } from '@auth/firebase-adapter';
import { firebaseAdminApp } from '@/config/firebase/firestore';
export const authConfig = {
  pages: { signIn: '/signIn' },
  adapter: FirestoreAdapter(firebaseAdminApp),
  providers: [],
} satisfies NextAuthConfig;
