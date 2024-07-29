import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { signInWithCustomToken } from 'firebase/auth';
import { authFirebase } from '@/firebase/config';

const useFirebaseAuth = () => {
  const { data: session, status } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkFirebaseAuth = async () => {
      if (status === 'authenticated' && session) {
        const user = authFirebase.currentUser;
        if (!user && session.customToken) {
          try {
            await signInWithCustomToken(authFirebase, session.customToken);
            setIsAuthenticated(true);
          } catch (error) {
            console.error('Error signing in with Firebase:', error);
            signOut();
          }
        } else {
          setIsAuthenticated(true);
        }
      }
    };

    checkFirebaseAuth();
  }, [status, session]);

  return isAuthenticated;
};

export default useFirebaseAuth;
