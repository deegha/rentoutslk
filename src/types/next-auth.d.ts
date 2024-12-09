import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
      email?: string;
      uid?: string;
      idToken?: string | null;
      accessToken?: string | null;
      exp?: number | null;
      refreshToken?: string | null;
    };
  }

  interface JWT {
    id?: string;
    email?: string;
    uid?: string;
    idToken?: string;
    accessToken?: string;
    refreshToken?: string;
    exp?: number;
  }
}
