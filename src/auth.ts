import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { type DefaultSession } from 'next-auth';
import GitHub from 'next-auth/providers/github';

import prisma from './lib/prisma';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized: ({ auth }) => {
      return !!auth;
    },
    jwt: async ({ token, user }) => {
      if (user) token.id = user.id;

      return token;
    },
    session: async ({ session, token, user }) => {
      if (token.id) session.user.id = token.id as string;

      return session;
    },
  },
});
