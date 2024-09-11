import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
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
import { UserRent } from '@/interface/session';

const checkFirebaseAuth = async (): Promise<User | null> => {
  return new Promise((resolve) => {
    onAuthStateChanged(authFirebase, (user) => resolve(user || null));
  });
};

const refreshFirebaseToken = async (user: User) => {
  return user ? await user.getIdToken(true) : null;
};

export const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (
          !email ||
          typeof email !== 'string' ||
          !password ||
          typeof password !== 'string'
        ) {
          console.error('Email or password is missing or not a string');
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
              savedProperties: [],
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
    async jwt({ token, user, ..._rest }) {
      if (user) {
        const customUser = user as unknown as UserRent;
        token.id = customUser.id;
        token.customToken = customUser.customToken;
        token.idToken = customUser.idToken;
        token.admin = customUser.admin || false;
        token.exp = Math.floor(Date.now() / 1000) + 60 * 60 * 2;
      }

      if (
        token.idTokenExpires &&
        typeof token.idTokenExpires === 'number' &&
        Math.floor(Date.now() / 1000) > token.idTokenExpires
      ) {
        const firebaseUser = await checkFirebaseAuth();
        if (firebaseUser) {
          token.idToken = await refreshFirebaseToken(firebaseUser);
          token.idTokenExpires = Math.floor(Date.now() / 1000) + 60 * 60;
        }
      }

      return token;
    },

    async session({ session, token }) {
      const customUser = session.user as unknown as UserRent;
      if (session.user) {
        customUser.id = token.id as string;
        customUser.customToken = token.customToken as string;
        customUser.idToken = token.idToken as string;
        customUser.admin = token.admin as boolean;
        customUser.exp = token.exp as number;
      }
      return session;
    },
  },
  events: {
    async signOut() {
      await firebaseSignOut(authFirebase);
    },
  },
  trustHost: true,
};

const nextAuthInstance = NextAuth(authOptions);

const { handlers, auth, signIn, signOut } = nextAuthInstance;

export { handlers, auth, signIn, signOut };
export default nextAuthInstance;
