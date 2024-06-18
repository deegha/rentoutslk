// import type { NextAuthOptions } from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth, db } from '@/config/firebase/config';
// import { doc, getDoc } from 'firebase/firestore';
// import { FirestoreAdapter } from '@next-auth/firebase-adapter';
// import { adminDb } from '@/config/firebase/firestore';

// export const options: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID || '',
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
//     }),
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: {
//           label: 'Email:',
//           type: 'text',
//           placeholder: 'Your Email',
//         },
//         password: {
//           label: 'Password:',
//           type: 'password',
//           placeholder: 'Password',
//         },
//       },
//       async authorize(credentials) {
//         if (!credentials) {
//           return null;
//         }

//         try {
//           const userCredential = await signInWithEmailAndPassword(
//             auth,
//             credentials.email,
//             credentials.password,
//           );
//           const user = userCredential.user;

//           if (user) {
//             const userDoc = await getDoc(doc(db, 'users', user.uid));
//             if (userDoc.exists()) {
//               return {
//                 id: user.uid,
//                 email: user.email,
//                 ...userDoc.data(),
//               };
//             } else {
//               console.error('No user found in Firestore');
//               return null;
//             }
//           }
//           return null;
//         } catch (error) {
//           console.error('Error in authorize function:', error);
//           return null;
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: '/signIn',
//     newUser: '/signUp',
//     error: '/error',
//   },
//   adapter: FirestoreAdapter(adminDb),
//   callbacks: {
//     async signIn({ user, account, profile, email, credentials }) {
//       const isAllowedToSignIn = true;
//       if (isAllowedToSignIn) {
//         return true;
//       } else {
//         // Return false to display a default error message
//         return false;
//         // Or you can return a URL to redirect to:
//         // return '/unauthorized'
//       }
//     },
//     async redirect({ url, baseUrl }) {
//       // Allows relative callback URLs
//       if (url.startsWith('/')) return `${baseUrl}${url}`;
//       // Allows callback URLs on the same origin
//       else if (new URL(url).origin === baseUrl) return url;
//       return baseUrl;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },

//   },
// };
