import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
export const BASE_PATH = '/api/auth';

const authOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<User | null> {
        const users = [
          {
            id: 'test-user-1',
            userName: 'test1',
            name: 'Test 1',
            password: 'pass',
            email: 'test1@gmail.com',
          },
        ];
        const user = users.find(
          (user) =>
            user.email === credentials.email &&
            user.password === credentials.password,
        );
        return user
          ? { id: user.id, name: user.name, email: user.email }
          : null;
      },
    }),
  ],
  basePath: BASE_PATH,
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: '/signIn' },
};
export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
