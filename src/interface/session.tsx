import { Session as AuthSession, User as AuthUser } from '@auth/core/types';

export interface UserRent extends AuthUser {
  uid?: string;
  id?: string;
  email?: string;
  emailVerified?: Date | null;
  mobile?: string;
  customToken?: string;
  idToken?: string;
  admin?: boolean;
  exp?: number;
  status?: string;
}

export interface CustomSession extends AuthSession {
  user: UserRent;
}
