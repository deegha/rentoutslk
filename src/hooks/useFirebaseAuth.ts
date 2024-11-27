import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { signInWithCustomToken } from 'firebase/auth';
import { authFirebase } from '@/firebase/config';
import { CustomSession } from '@/interface/session';

const useFirebaseAuth = () => {
  const { data: session, status } = useSession() as {
    data: CustomSession | null;
    status: 'authenticated' | 'loading' | 'unauthenticated';
  };
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkFirebaseAuth = async () => {
      if (status === 'authenticated' && session) {
        const user = authFirebase.currentUser;
        if (!user && session.user.customToken) {
          try {
            await signInWithCustomToken(authFirebase, session.user.customToken);
            setIsAuthenticated(true);
          } catch (error) {
            console.error('Error signing in with Firebase:', error);
            await signOut();
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
