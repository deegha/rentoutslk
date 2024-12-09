import { authFirebase, db } from '@/firebase/config';
import NextAuth, { type NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getIdToken,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithCredential,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { getCustomToken } from '@/firebase/firebaseAdmin';
import { refreshGoogleToken } from '@/utils/googleAuthUtils';
import type { Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import { Account, User as NextAuthUser } from 'next-auth';

interface FirestoreUserData {
  email: string;
  password: string;
  uid: string;
  admin?: boolean;
}

export const authConfig: NextAuthConfig = {
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

        if (!email || !password) return null;

        const userQuery = query(
          collection(db, 'users'),
          where('email', '==', email),
        );
        const userDocs = await getDocs(userQuery);

        if (!userDocs.empty) {
          // User exists
          const userDoc = userDocs.docs[0];
          const userData = userDoc.data() as FirestoreUserData;
          const userCredential = await signInWithEmailAndPassword(
            authFirebase,
            userData.email,
            userData.password,
          );
          const user = userCredential.user;
          const idToken = await getIdToken(user, true);

          await updateDoc(doc(db, 'users', userDoc.id), {
            lastLogin: new Date(),
          });

          const customToken = await getCustomToken(user.uid);

          return {
            id: userDoc.id,
            email: userData.email,
            uid: userData.uid,
            customToken,
            idToken,
            admin: userData.admin,
          };
        } else {
          // New user
          const userCredential = await createUserWithEmailAndPassword(
            authFirebase,
            email as string,
            password as string,
          );
          const newUser = userCredential.user;
          const idToken = await getIdToken(newUser, true);

          const newUserRef = await addDoc(collection(db, 'users'), {
            email: newUser.email,
            uid: newUser.uid,
            createdAt: new Date(),
            lastLogin: new Date(),
            savedProperties: [],
            status: 'approved',
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
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'openid email profile',
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user?: NextAuthUser;
      account?: Account | null;
    }) {
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

          let userId = '';
          if (userDocs.empty) {
            const newUserRef = await addDoc(collection(db, 'users'), {
              email: googleUser.email,
              uid: googleUser.uid,
              createdAt: new Date(),
              lastLogin: new Date(),
              savedProperties: [],
              status: 'approved',
            });
            userId = newUserRef.id;
          } else {
            const userDoc = userDocs.docs[0];
            await updateDoc(doc(db, 'users', userDoc.id), {
              lastLogin: new Date(),
            });
            userId = userDoc.id;
          }

          // exp ставим на короткий срок для теста, например 30 секунд
          const exp = Math.floor(Date.now() / 1000) + 30;

          (user as any).id = userId;
          (user as any).uid = googleUser.uid;
          (user as any).email = googleUser.email;
          (user as any).idToken = idToken;
          (user as any).exp = exp;

          return true;
        } catch (error) {
          console.error('Google sign-in error', error);
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

          let userId = '';
          if (userDocs.empty) {
            const newUserRef = await addDoc(collection(db, 'users'), {
              email: facebookUser.email,
              uid: facebookUser.uid,
              createdAt: new Date(),
              lastLogin: new Date(),
              savedProperties: [],
              status: 'approved',
            });
            userId = newUserRef.id;
          } else {
            const userDoc = userDocs.docs[0];
            await updateDoc(doc(db, 'users', userDoc.id), {
              lastLogin: new Date(),
            });
            userId = userDoc.id;
          }

          const exp = Math.floor(Date.now() / 1000) + 30;

          (user as any).id = userId;
          (user as any).uid = facebookUser.uid;
          (user as any).email = facebookUser.email;
          (user as any).idToken = idToken;
          (user as any).exp = exp;

          return true;
        } catch (error) {
          console.error('Facebook sign-in error', error);
          return false;
        }
      }

      return true;
    },

    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user?: NextAuthUser;
      account?: Account | null;
    }) {
      if (account?.provider === 'google') {
        token.refreshToken = account.refresh_token || null;
        token.accessToken = account.access_token || null;
        token.idToken = account.id_token || null;
        token.exp = token.exp || Math.floor(Date.now() / 1000) + 30;
      }

      if (user) {
        // Копируем поля из user в token
        if ((user as any).id) token.id = (user as any).id;
        if ((user as any).uid) token.uid = (user as any).uid;
        if ((user as any).idToken) token.idToken = (user as any).idToken;
        if ((user as any).email) token.email = (user as any).email;
        if ((user as any).exp) token.exp = (user as any).exp;
      }

      // Проверяем истечение и пытаемся рефрешить
      if (token.exp && Date.now() / 1000 > token.exp) {
        console.log('Access token expired, attempting refresh...');
        if (token.refreshToken) {
          const refreshed = await refreshGoogleToken(
            token.refreshToken as string,
          );
          if (refreshed) {
            token.accessToken = refreshed.access_token || null;
            token.idToken = refreshed.id_token || null;
            token.exp =
              Math.floor(Date.now() / 1000) + (refreshed.expires_in || 3600);
            console.log('Token successfully refreshed', refreshed);
          } else {
            console.error('Failed to refresh token.');
          }
        }
      }

      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.exp && Date.now() >= token.exp * 1000) {
        return { ...session, user: undefined };
      }

      session.user.id = token.id as string;
      session.user.email = token.email || '';
      session.user.uid = token.uid as string;
      session.user.exp = token.exp || null;
      session.user.idToken =
        typeof token.idToken === 'string' ? token.idToken : null;
      session.user.refreshToken =
        typeof token.refreshToken === 'string' ? token.refreshToken : null;

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

const nextAuthInstance = NextAuth(authConfig);

const { handlers, auth, signIn, signOut } = nextAuthInstance;

export { handlers, auth, signIn, signOut };
export default nextAuthInstance;
