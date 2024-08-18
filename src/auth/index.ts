import NextAuth from 'next-auth';
import type { NextAuthOptions, JWT } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import { authFirebase, db } from '@/firebase/config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  getIdToken,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { getCustomToken } from '@/firebase/firebaseAdmin';
import { CustomSession, UserRent } from '@/interface/session';

// Helper function to check Firebase authentication
const checkFirebaseAuth = async (): Promise<User | null> => {
  return new Promise((resolve) => {
    onAuthStateChanged(authFirebase, (user) => resolve(user || null));
  });
};

// Helper function to refresh Firebase token
const refreshFirebaseToken = async (user: User) => {
  return user ? await user.getIdToken(true) : null;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) {
          console.error('Email or password is missing');
          return null;
        }

        try {
          const userQuery = query(
            collection(db, 'users'),
            where('email', '==', email),
          );
          const userDocs = await getDocs(userQuery);

          if (!userDocs.empty) {
            const userDoc = userDocs.docs[0];
            const userData = userDoc.data();
            const userCredential = await signInWithEmailAndPassword(
              authFirebase,
              email,
              password,
            );
            const user = userCredential.user;
            const idToken = await getIdToken(user, true);

            await updateDoc(doc(db, 'users', userDoc.id), {
              lastLogin: new Date(),
            });

            const customToken = await getCustomToken(user.uid);

            return {
              id: userDoc.id,
              ...userData,
              customToken,
              idToken,
              admin: userData.admin,
            };
          } else {
            const userCredential = await createUserWithEmailAndPassword(
              authFirebase,
              email,
              password,
            );
            const newUser = userCredential.user;
            const idToken = await getIdToken(newUser, true);

            const newUserRef = await addDoc(collection(db, 'users'), {
              email: newUser.email,
              uid: newUser.uid,
              createdAt: new Date(),
              lastLogin: new Date(),
            });

            const customToken = await getCustomToken(newUser.uid);
            return {
              id: newUserRef.id,
              email: newUser.email,
              uid: newUser.uid,
              customToken,
              idToken,
            };
          }
        } catch (error) {
          console.error('Error during authorization:', error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: UserRent }) {
      if (user) {
        token.id = user.id;
        token.customToken = user.customToken;
        token.idToken = user.idToken;
        token.admin = user.admin || false;
        token.exp = Math.floor(Date.now() / 1000) + 60 * 60; // 1 hour expiration
      }

      // Check if the token needs to be refreshed
      if (
        token.idTokenExpires &&
        Math.floor(Date.now() / 1000) > token.idTokenExpires
      ) {
        const firebaseUser = await checkFirebaseAuth();
        if (firebaseUser) {
          token.idToken = await refreshFirebaseToken(firebaseUser);
          token.idTokenExpires = Math.floor(Date.now() / 1000) + 60 * 60; // Extend expiration
        } else {
          token = null; // Invalidate token if no Firebase user
        }
      }

      return token;
    },
    async session({ session, token }: { session: CustomSession; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.customToken = token.customToken as string;
        session.user.idToken = token.idToken as string;
        session.user.admin = token.admin as boolean;
        session.user.exp = token.exp as number;
      }
      return session;
    },
  },
  events: {
    async signOut() {
      await firebaseSignOut(authFirebase);
    },
  },
};

const nextAuthInstance = NextAuth(authOptions);

const { handlers, auth, signIn, signOut } = nextAuthInstance;

export { handlers, auth, signIn, signOut };
export default nextAuthInstance;
