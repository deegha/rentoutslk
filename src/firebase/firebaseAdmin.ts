import admin from 'firebase-admin';

const serviceAccount = {
  projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
  clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const firestore = admin.firestore();
export const auth = admin.auth();

export const getCustomToken = async (uid: string) => {
  try {
    const customToken = await auth.createCustomToken(uid);
    return customToken;
  } catch (error) {
    console.error('Error creating custom token:', error);
    throw new Error('Error creating custom token');
  }
};
