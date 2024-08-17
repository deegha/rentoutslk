import { Session as AuthSession, User as AuthUser } from '@auth/core/types';

export interface UserRent extends AuthUser {
  id: string;
  email: string;
  mobile: string;
  customToken: string;
  idToken: string;
  admin: boolean;
  exp: number;
}

export interface CustomSession extends AuthSession {
  user: UserRent;
}
