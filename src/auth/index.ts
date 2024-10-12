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
  GoogleAuthProvider,
  signInWithCredential,
  FacebookAuthProvider,
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

        if (!email || !password) {
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
        } catch {
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
    async signIn({ user, account }) {
      if (account?.provider === 'google' && account.id_token) {
        try {
          const credential = GoogleAuthProvider.credential(account.id_token);
          const userCredential = await signInWithCredential(
            authFirebase,
            credential,
          );
          const googleUser = userCredential.user;
          const idToken = await getIdToken(googleUser, true);

          const userQuery = query(
            collection(db, 'users'),
            where('uid', '==', googleUser.uid),
          );
          const userDocs = await getDocs(userQuery);

          if (userDocs.empty) {
            const newUserRef = await addDoc(collection(db, 'users'), {
              email: googleUser.email,
              uid: googleUser.uid,
              createdAt: new Date(),
              lastLogin: new Date(),
              savedProperties: [],
            });

            (user as UserRent).id = newUserRef.id;
          } else {
            const userDoc = userDocs.docs[0];
            await updateDoc(doc(db, 'users', userDoc.id), {
              lastLogin: new Date(),
            });

            (user as UserRent).id = userDoc.id;
          }

          (user as UserRent).uid = googleUser.uid;
          (user as UserRent).email = googleUser.email!;
          (user as UserRent).idToken = idToken;
          (user as UserRent).exp =
            Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 2;

          return true;
        } catch {
          return false;
        }
      }
      if (account?.provider === 'facebook' && account.access_token) {
        try {
          const credential = FacebookAuthProvider.credential(
            account.access_token,
          );
          const userCredential = await signInWithCredential(
            authFirebase,
            credential,
          );
          const facebookUser = userCredential.user;
          const idToken = await getIdToken(facebookUser, true);

          const userQuery = query(
            collection(db, 'users'),
            where('uid', '==', facebookUser.uid),
          );
          const userDocs = await getDocs(userQuery);

          if (userDocs.empty) {
            const newUserRef = await addDoc(collection(db, 'users'), {
              email: facebookUser.email,
              uid: facebookUser.uid,
              createdAt: new Date(),
              lastLogin: new Date(),
              savedProperties: [],
            });

            (user as UserRent).id = newUserRef.id;
          } else {
            const userDoc = userDocs.docs[0];
            await updateDoc(doc(db, 'users', userDoc.id), {
              lastLogin: new Date(),
            });

            (user as UserRent).id = userDoc.id;
          }

          (user as UserRent).uid = facebookUser.uid;
          (user as UserRent).email = facebookUser.email!;
          (user as UserRent).idToken = idToken;
          (user as UserRent).exp =
            Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 2;

          return true;
        } catch (error) {
          console.error('Facebook sign-in error', error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user, account }) {
      if (account?.provider === 'facebook' && user) {
        const customUser = user as UserRent;
        token.idToken = customUser.idToken;
        token.uid = customUser.uid;
        token.exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 2;
      }

      if (user) {
        const customUser = user as UserRent;
        token.id = customUser.id;
        token.email = customUser.email || token.email || '';
        token.uid = customUser.uid;
        token.exp = customUser.exp;
        token.idToken = customUser.idToken || token.idToken;
      }

      return token;
    },

    async session({ session, token }) {
      if (token.exp && Math.floor(Date.now() / 1000) > token.exp) {
        return { ...session, user: undefined };
      }

      session.user = {
        id: token.id as string,
        email: token.email || '',
        uid: token.uid as string,
        exp: token.exp as number,
        idToken: (token.idToken as string) || null,
      } as UserRent;

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
