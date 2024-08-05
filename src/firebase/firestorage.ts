import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfigStorage = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY_STORAGE,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN_STORAGE,
  databaseURL: process.env.NEXT_PUBLIC_DATA_BASE_URL_STORAGE,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID_STORAGE,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET_STORAGE,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID_STORAGE,
  appId: process.env.NEXT_PUBLIC_APP_ID_STORAGE,
};

const storageApp = initializeApp(firebaseConfigStorage, 'storageApp');
const storage = getStorage(storageApp);

export { storage };
