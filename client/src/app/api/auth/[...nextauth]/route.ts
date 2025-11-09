import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  debug: true,
  pages: { signIn: '/asad-login' },
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(creds) {
        const email = creds?.email?.trim() ?? '';
        const password = creds?.password ?? '';
        if (!email || !password) return null;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
          return { id: 'admin-1', name: 'Admin', email };
        }
        return null;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export const { GET, POST, PUT, DELETE, PATCH } = handler;
