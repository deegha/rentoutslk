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

const checkFirebaseAuth = async (): Promise<User | null> => {
  return new Promise((resolve) => {
    onAuthStateChanged(authFirebase, (user) => {
      resolve(user || null);
    });
  });
};

const refreshFirebaseToken = async (user: User) => {
  if (user) {
    return await user.getIdToken(true);
  }
  return null;
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
          const q = query(collection(db, 'users'), where('email', '==', email));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            try {
              const userCredential = await signInWithEmailAndPassword(
                authFirebase,
                email,
                password,
              );
              const user = userCredential.user;
              const idToken = await getIdToken(user, true);

              const docSnap = querySnapshot.docs[0];
              const userRef = doc(db, 'users', docSnap.id);
              await updateDoc(userRef, { lastLogin: new Date() });

              const userDoc = { id: docSnap.id, ...docSnap.data() };
              const customToken = await getCustomToken(user.uid);
              return { ...userDoc, customToken, idToken };
            } catch (signInError) {
              console.error('Error signing in:', signInError);
              return null;
            }
          } else {
            try {
              const userCredential = await createUserWithEmailAndPassword(
                authFirebase,
                email,
                password,
              );
              const newUser = userCredential.user;
              const idToken = await getIdToken(newUser, true);

              const userRef = await addDoc(collection(db, 'users'), {
                email: newUser.email,
                uid: newUser.uid,
                createdAt: new Date(),
                lastLogin: new Date(),
              });

              const userDoc = {
                id: userRef.id,
                email: newUser.email,
                uid: newUser.uid,
              };
              const customToken = await getCustomToken(newUser.uid);
              return { ...userDoc, customToken, idToken };
            } catch (createUserError) {
              console.error('Error creating user:', createUserError);
              return null;
            }
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
        token.idTokenExpires = Math.floor(Date.now() / 1000) + 60 * 60; // 1 hour
      }

      if (
        token.idTokenExpires &&
        Math.floor(Date.now() / 1000) > token.idTokenExpires
      ) {
        const firebaseUser = await checkFirebaseAuth();
        if (firebaseUser) {
          token.idToken = await refreshFirebaseToken(firebaseUser);
          token.idTokenExpires = Math.floor(Date.now() / 1000) + 60 * 60;
        } else {
          token = null;
        }
      }
      return token;
    },
    async session({ session, token }: { session: CustomSession; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.customToken = token.customToken as string;
        session.user.idToken = token.idToken as string;
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
