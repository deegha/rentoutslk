import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
    clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
<<<<<<< HEAD
    privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
=======
    privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // Handle newline characters
>>>>>>> 6428547 (For backup)
  }),
};

const firebaseAdminApp = !getApps().length
  ? initializeApp(firebaseAdminConfig)
  : getApp();
const adminDb = getFirestore(firebaseAdminApp);

export { firebaseAdminApp, adminDb };
