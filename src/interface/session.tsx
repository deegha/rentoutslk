import { Session as AuthSession, User as AuthUser } from '@auth/core/types';

export interface UserRent extends AuthUser {
  uid: unknown;
  id: string;
  email: string;
  emailVerified: Date | null;
  mobile: string;
  customToken: string;
  idToken: string;
  admin: boolean;
  exp: number;
}

export interface CustomSession extends AuthSession {
  user: UserRent;
}
