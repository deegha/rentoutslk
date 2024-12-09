'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { refreshGoogleToken } from '@/utils/googleAuthUtils';
import { reAuthenticateWithFirebase } from '@/utils/reauthFirebase';

export function useGlobalTokenRefresh() {
  const { data: session } = useSession();

  useEffect(() => {
    (async () => {
      if (session?.user?.exp && Date.now() / 1000 > session.user.exp) {
        // Токен истёк
        const refreshToken = session.user.refreshToken;
        if (!refreshToken) {
          console.error('No refresh token available');
          return;
        }

        const refreshed = await refreshGoogleToken(refreshToken);
        if (refreshed) {
          // Попытка реавторизоваться с Firebase
          const newGoogleIdToken = refreshed.id_token;
          const newGoogleAccessToken = refreshed.access_token;

          // Если есть id_token от Google
          if (newGoogleIdToken) {
            await reAuthenticateWithFirebase(newGoogleIdToken);
          } else if (newGoogleAccessToken) {
            await reAuthenticateWithFirebase(null, newGoogleAccessToken);
          } else {
            console.error('No id_token or access_token after refresh');
          }
        }
      }
    })();
  }, [session]);
}
